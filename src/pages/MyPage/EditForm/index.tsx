import React, { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getFormInfo } from '../../../api/getFormInfo';
import { GetFormInfo } from '../../../typings/getForm';
import { useRecoilState } from 'recoil';
import {
  nowFocusIndex,
  nowQuestion,
  queSectionNum,
  questions,
  sectionLens,
  sectionNames,
} from '../../../recoil/MakeForm/atom';
import { DESCRIPTION_SHORT, DescriptionQue, GridQue, SelectionQue } from '../../../typings/makeForm';
import { Col, Row } from 'antd';
import { AddQuestion, AddSection, DirectForm } from '../../MakeForm/Direct/styles';
import { useMessage } from '../../../hooks/useMessage';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import { deleteQue } from '../../../api/editForm';
import QueDraggable from '../../../components/Form/Questions/QueDraggable';
import SectionBox from '../../../components/Form/Questions/SectionBox';
import FormTitle from '../../../components/Form/Questions/FormTitle';
import { useGetSingleForm } from '../../../components/Form/hooks/useGetSingleForm';
import { customData } from '../../../utils/customData';

export default function EditForm() {
  const { id } = useParams();
  const [questionList, setQuestionList] = useRecoilState(questions);
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

        setQuestionList(customData(data!));

        return { snapshot };
      },
      onError: (error, newData, context) => {
        if (context?.snapshot) {
          queryClient.setQueryData(['getFormInfo', id], context?.snapshot);
          setQuestionList(customData({ ...context?.snapshot }));
          alert('수정 실패!');
        }
      },
      onSettled() {
        queryClient.invalidateQueries(['getFormInfo', id]);
      },
    }
  );

  const deleteQuestion = useCallback((id: number) => {
    deleteQueMutate(id);
  }, []);

  // 각 섹션이 몇 번 인덱스까지 사용하는지
  const [accrueQue, setAccrueQue] = useRecoilState(sectionLens);
  const [nowIndex, setNowIndex] = useRecoilState(nowFocusIndex);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);
  const [sectionList, setSectionList] = useRecoilState(sectionNames);
  const [queSecNum, setQueSecNum] = useRecoilState(queSectionNum);
  const ref = useRef<HTMLDivElement>(null);
  const { showMessage, contextHolder } = useMessage();

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

  const onClickQue = useCallback(
    (row: number, col: number) => {
      const index = row === 0 ? col : accrueQue[row - 1] + col + 1;

      // setNowIndex(index);
      setNowQueInfo({ row, col });
    },
    [nowQueInfo, nowIndex, accrueQue]
  );

  useEffect(() => {
    setQuestionList(customData(data!));
  }, [data]);

  if (isLoading) {
    return <div style={{ position: 'fixed', top: '50px', right: '50px' }}>로딩중...</div>;
  }

  return (
    <Row style={{ position: 'relative', backgroundColor: `${data.fcolor || ''}` }}>
      <Col span={4} />
      <Col span={16}>
        {contextHolder}
        {isFetching && <div style={{ position: 'fixed', top: '50px', right: '50px' }}>Loading...</div>}

        <DirectForm>
          <FormTitle isEdit={true} formId={id} />
          {questionList?.map((section: (DescriptionQue | SelectionQue | GridQue)[], row: number) => (
            <DragDropContext key={`section-${row}`} onDragEnd={() => true}>
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
                                  // onChangeTitle={() => {
                                  //   true;
                                  // }}
                                  onClickQue={onClickQue}
                                  onDelete={() => {
                                    deleteQuestion(que.id!);
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
                                  deleteQuestion(que.id!);
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
        </DirectForm>
      </Col>
      <Col span={4} />
    </Row>
  );
}
