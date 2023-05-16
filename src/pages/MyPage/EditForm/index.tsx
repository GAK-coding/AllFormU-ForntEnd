import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getFormInfo } from '../../../api/getFormInfo';
import { GetFormInfo } from '../../../typings/getForm';
import MakeFormDirect from '../../MakeForm/Direct';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  formInfo,
  nowFocusIndex,
  nowQuestion,
  queSectionNum,
  questions,
  questionTypes,
  sectionLens,
  sectionNames,
} from '../../../recoil/MakeForm/atom';
import {
  Description,
  DESCRIPTION_SHORT,
  DescriptionQue,
  GridQue,
  Option,
  SelectionQue,
} from '../../../typings/makeForm';
import { Col, Row } from 'antd';
import { AddQuestion, AddSection, DirectForm } from '../../MakeForm/Direct/styles';
import Button from '../../../components/ui/Button';
import { useMessage } from '../../../hooks/useMessage';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { color } from '../../../recoil/Color/atom';
import { v4 as uuid } from 'uuid';
import { deleteQue } from '../../../api/editForm';
import MakeFromModal from '../../../components/Form/MakeForm/MakeFromModal';
import QueDraggable from '../../../components/Form/Questions/QueDraggable/indes';
import SectionBox from '../../../components/Form/Questions/SectionBox';
import FormTitle from '../../../components/Form/Questions/FormTitle';
import { useGetSingleForm } from '../../../components/Form/hooks/useGetSingleForm';

const customData = (data: GetFormInfo) => {
  const tempQues: (DescriptionQue | SelectionQue | GridQue)[][] = [];

  data?.questions?.map((que) => {
    const { sectionNum } = que;

    if (tempQues[sectionNum] === undefined) tempQues[sectionNum] = [];
    tempQues[sectionNum].push({ ...que, tempId: uuid() });
  });

  return tempQues;
};

export default function EditForm() {
  const { id } = useParams();
  const [info, setInfo] = useRecoilState(formInfo);
  const [questionList, setQuestionList] = useRecoilState(questions);
  const queTypes = useRecoilValue(questionTypes);

  // const { data, isLoading, error, isError, isFetching } = useQuery<GetFormInfo>(
  //   ['getFormInfo', id],
  //   ({ signal }) => getFormInfo(1, +id!, signal!),
  //   {
  //     notifyOnChangeProps: ['data'],
  //     onSuccess: (data) => {
  //       setInfo(data);
  //     },
  //     staleTime: 600000, // 10분
  //     cacheTime: 900000, // 15분
  //     refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
  //     refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
  //     refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
  //   }
  // );
  const queryClient = useQueryClient();

  const [data, isLoading, isFetching] = useGetSingleForm(id!);

  const { mutate: deleteQueMutate, isLoading: deleteQueIsLoading } = useMutation(
    (queId: number) => deleteQue(+id!, queId),
    {
      onMutate: async (queId) => {
        await queryClient.cancelQueries(['getFormInfo', id]);

        const snapshot: GetFormInfo | undefined = queryClient.getQueryData(['getFormInfo', id]);

        const deleteInfo = { ...snapshot }.questions?.filter(
          (info: DescriptionQue | SelectionQue | GridQue) => queId !== info.id
        );

        queryClient.setQueryData(['getFormInfo', id], {
          ...snapshot,
          deleteInfo,
        });

        return { snapshot };
      },
      onSuccess: (data) => {
        queryClient.setQueryData(['getFormInfo', id], data);
      },
      onError: (error, newData, context) => {
        if (context?.snapshot) {
          queryClient.setQueryData(['getFormInfo', id], context?.snapshot);
          alert('수정 실패!');
        }
      },
      onSettled() {
        queryClient.invalidateQueries(['getFormInfo', id]);
      },
    }
  );

  useEffect(() => {
    if (data) setQuestionList(customData(data));
  }, [data]);

  // console.log(customData(data!));

  // 각 섹션이 몇 번 인덱스까지 사용하는지
  const [accrueQue, setAccrueQue] = useRecoilState(sectionLens);
  const [nowIndex, setNowIndex] = useRecoilState(nowFocusIndex);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);
  const [sectionList, setSectionList] = useRecoilState(sectionNames);
  const [queSecNum, setQueSecNum] = useRecoilState(queSectionNum);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { showMessage, contextHolder } = useMessage();
  const { blue } = useRecoilValue(color);

  const showModal = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const addQuestion = useCallback(() => {
    const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));
    const { row, col } = nowQueInfo;

    let queSum = 0;
    questionList.map((que) => (queSum += que.length));
    if (queSum >= 100) {
      showMessage('warning', '질문은 100개까지만 등록 가능합니다.');
      return;
    }

    temp[row].splice(col + 1, 0, {
      type: DESCRIPTION_SHORT,
      tempId: uuid(),
      required: false,
      title: '',
      sectionNum: row,
      descriptions: [{ content: '' }],
    });

    setQuestionList(temp);
    setNowIndex((prev) => prev + 1);
  }, [questionList, nowQueInfo, nowIndex]);

  const addSection = useCallback(() => {
    const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));
    const tempSectionList: string[] = JSON.parse(JSON.stringify(sectionList));

    let queSum = 0;
    questionList.map((que) => (queSum += que.length));
    if (queSum >= 100) {
      showMessage('warning', '질문은 100개까지만 등록 가능합니다.');
      return;
    }

    if (questionList.length >= 5) {
      showMessage('warning', '섹션은 5개까지만 등록 가능합니다.');
      return;
    }

    temp.push([
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: true,
        title: '',
        sectionNum: temp.length,
        descriptions: [{ content: '' }],
      },
    ]);

    setQuestionList(temp);
    setQueSecNum((prev) => [...prev, { value: queSecNum.length.toString(), label: (queSecNum.length + 1).toString() }]);
    setSectionList([...tempSectionList, '']);
    setNowQueInfo({ row: temp.length - 1, col: 0 });
    setNowIndex(accrueQue[accrueQue.length - 1] + 1);
  }, [questionList, nowIndex, accrueQue, nowQueInfo, sectionList, queSecNum]);

  const onDragEnd = useCallback(
    (result: DropResult, row: number) => {
      const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));

      const start = result.source.index;
      const end = result?.destination?.index;

      const [remove] = temp[row].splice(start, 1);
      temp[row].splice(end!, 0, remove);

      setQuestionList(temp);
      setNowIndex(row === 0 ? end! : accrueQue[row - 1] + 1 + end!);
      setNowQueInfo({ row: row, col: end! });
    },
    [questionList, nowIndex, accrueQue, nowQueInfo]
  );

  const onClickQue = useCallback(
    (row: number, col: number) => {
      const index = row === 0 ? col : accrueQue[row - 1] + col + 1;

      setNowIndex(index);
      setNowQueInfo({ row, col });
    },
    [nowQueInfo, nowIndex, accrueQue]
  );

  // useLayoutEffect(() => {
  //   const temp: number[] = [];
  //
  //   for (let i = 0; i < questionList.length; i++) {
  //     i === 0 ? temp.push(questionList[i].length - 1) : temp.push(temp[i - 1] + questionList[i].length);
  //   }
  //
  //   setAccrueQue(temp);
  // }, [addQuestion]);

  // useLayoutEffect(() => {
  //   ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  // }, [questionList]);

  // useEffect(() => {}, []);

  if (isFetching) return <div style={{ position: 'fixed', top: '50px', right: '50px' }}>Loading...</div>;
  if (isLoading || deleteQueIsLoading) {
    return <div style={{ position: 'fixed', top: '50px', right: '50px' }}>로딩중...</div>;
  }

  return (
    <Row style={{ position: 'relative' }}>
      <Col span={4} />
      <Col span={16}>
        {contextHolder}
        {isFetching && <div style={{ position: 'fixed', top: '50px', right: '50px' }}>Loading...</div>}
        <DirectForm onSubmit={showModal}>
          <FormTitle isEdit={true} formId={id} />
          {questionList?.map((section, row) => (
            <DragDropContext key={`section-${row}`} onDragEnd={(result) => onDragEnd(result, row)}>
              <SectionBox index={row}>
                <Droppable droppableId="card" type="card" direction="vertical">
                  {(provided) => (
                    <div>
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {section?.map((que, col) => {
                          const focus = row === 0 ? col === nowIndex : accrueQue[row - 1] + col + 1 === nowIndex;

                          if (focus) {
                            return (
                              <div ref={ref} key={que.tempId}>
                                <QueDraggable
                                  draggableId={que.tempId}
                                  data={que}
                                  row={row}
                                  col={col}
                                  isClick={focus}
                                  onChangeTitle={() => {
                                    true;
                                  }}
                                  onClickQue={() => {
                                    true;
                                  }}
                                  onDelete={() => {
                                    deleteQueMutate(que.id!);
                                  }}
                                />
                              </div>
                            );
                          }

                          return (
                            <div key={que.tempId}>
                              <QueDraggable
                                draggableId={que.tempId}
                                data={que}
                                row={row}
                                col={col}
                                isClick={focus}
                                onChangeTitle={() => {
                                  true;
                                }}
                                onClickQue={onClickQue}
                                onDelete={() => {
                                  true;
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </SectionBox>
            </DragDropContext>
          ))}
          <Button type={'submit'} color={'black'} bgColor={blue} fontSize={1.6} width={14} height={4.5}>
            폼 생성하기
          </Button>
        </DirectForm>

        <MakeFromModal isCreate={isCreate} setIsCreate={setIsCreate} open={isModalOpen} onCancel={handleCancel} />
      </Col>
      <Col span={4}>
        <AddQuestion onClick={addQuestion}>
          <span>질문 추가</span>
        </AddQuestion>
        <AddSection onClick={addSection}>
          <span>섹션 추가</span>
        </AddSection>
      </Col>
    </Row>
  );
}
