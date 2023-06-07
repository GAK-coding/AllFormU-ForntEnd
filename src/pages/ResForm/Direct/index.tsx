import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { formInfo, nowFocusIndex, nowQuestion, questions, sectionLens } from '../../../recoil/MakeForm/atom';
import {
  DESCRIPTION_DATE,
  DESCRIPTION_IMG,
  DESCRIPTION_LONG,
  DESCRIPTION_SHORT,
  DESCRIPTION_TIME,
  DescriptionQue,
  GridQue,
  SelectionQue,
} from '../../../typings/makeForm';
import { Col, Row } from 'antd';
import { AddQuestion, AddSection, DirectForm } from '../../MakeForm/Direct/styles';
import Button from '../../../components/ui/Button';
import { useMessage } from '../../../hooks/useMessage';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { color } from '../../../recoil/Color/atom';
import MakeFromModal from '../../../components/Form/MakeForm/MakeFromModal';
import QueDraggable from '../../../components/Form/Questions/QueDraggable';
import SectionBox from '../../../components/Form/Questions/SectionBox';
import FormTitle from '../../../components/Form/Questions/FormTitle';
import { useGetSingleForm } from '../../../components/Form/hooks/useGetSingleForm';
import { customData } from '../../../utils/customData';
import { checkRequired, checkSelection, resDescriptionSets, resSelectionSets } from '../../../recoil/Resform/atom';
import { ResDescription, ResSelection, ResSelections } from '../../../typings/resForm';
import { createDescription, createSelection } from '../../../api/resFrom';
import { useMutation } from 'react-query';
import { userInfo } from '../../../recoil/User/atom';

function isDescriptionQue(que: DescriptionQue | SelectionQue | GridQue): que is DescriptionQue {
  return (
    que.type === DESCRIPTION_SHORT ||
    que.type === DESCRIPTION_LONG ||
    que.type === DESCRIPTION_DATE ||
    que.type === DESCRIPTION_TIME ||
    que.type === DESCRIPTION_IMG
  );
}

export default function DirectResForm() {
  const { id } = useParams();
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [data, isLoading, isFetching] = useGetSingleForm(id!);
  const [isRendering, setIsRendering] = useState(true);
  const [resDescriptionData, setResDescriptionData] = useRecoilState(resDescriptionSets);
  // const [resSelectionData, setResSelectionData] = useRecoilState(resSelectionSets);
  const [chkRequired, setChkRequired] = useRecoilState(checkRequired);
  const [chkSelection, setChkSelection] = useRecoilState(checkSelection);

  const [accrueQue, setAccrueQue] = useRecoilState(sectionLens);
  const [nowIndex, setNowIndex] = useRecoilState(nowFocusIndex);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const { showMessage, contextHolder } = useMessage();
  const { blue } = useRecoilValue(color);
  const [user, setUser] = useRecoilState(userInfo);
  const navigate = useNavigate();

  const [run, setRun] = useState(false);
  const {
    mutate: resDescriptionMutate,
    data: resDescData,
    isSuccess: isSuccessDescription,
  } = useMutation(createDescription);
  const {
    mutate: resSelectionMutate,
    data: resSelectData,
    isSuccess: isSuccessSelcetion,
  } = useMutation(createSelection);

  // console.log('으악', resSelectData?.httpStatus);
  // console.log('tpff', resDescData?.httpStatus);

  // console.log(resDescriptionData, Object.values(chkSelection).flat());

  const onClickRes = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();

      const description = JSON.parse(JSON.stringify(resDescriptionData));
      const selection = JSON.parse(JSON.stringify(Object.values(chkSelection).flat()));
      const required = JSON.parse(JSON.stringify(chkRequired));

      // console.log(description, selection);

      description.map((desc: ResDescription) => {
        if (required.includes(desc.question_id)) required.splice(required.indexOf(desc.question_id), 1);
      });

      selection.map((select: ResSelection) => {
        if (required.includes(select.questionId)) required.splice(required.indexOf(select.questionId), 1);
      });

      if (required.length !== 0) {
        showMessage('error', '필수 응답을 완료해주세요!');
        return;
      }

      if (selection.length === 0 && description.length !== 0) {
        let flag = false;

        description.map((select: ResDescription) => {
          if (select.content !== null) flag = true;
        });

        if (!flag) {
          showMessage('warning', '응답한 문항이 없습니다!');
          return;
        }
      }

      if (description.length === 0 && selection.length !== 0) {
        let flag = false;

        selection.map((select: ResSelection) => {
          if (select.num !== -1) flag = true;
        });

        if (!flag) {
          showMessage('warning', '응답한 문항이 없습니다!');
          return;
        }
      }

      if (description.length !== 0 && selection.length !== 0) {
        let flag = false;

        description.map((select: ResDescription) => {
          if (select.content !== null) flag = true;
        });

        selection.map((select: ResSelection) => {
          if (select.num !== -1) flag = true;
        });

        if (!flag) {
          showMessage('warning', '응답한 문항이 없습니다!');
          return;
        }
      }

      description.length > 0 && resDescriptionMutate({ formId: +id!, memberId: user.id, forms: description });
      // if (resDescData?.httpStatus === 'CONFLICT') return;

      selection.length > 0 && resSelectionMutate({ formId: +id!, memberId: user.id, forms: selection });
      // if (resSelectData?.httpStatus === 'NOT_ACCEPTABLE') return;

      setRun(true);
    },
    [resDescriptionData, chkRequired, chkSelection, resDescData, resSelectData, user, run]
  );

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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

  useEffect(() => {
    if (run && (isSuccessDescription || isSuccessSelcetion)) {
      if (resDescData?.httpStatus === 'CONFLICT' || resSelectData?.httpStatus === 'NOT_ACCEPTABLE') {
        showMessage('error', '이미 응답한 설문입니다!');
      } else showMessage('success', '응답 완료!');

      setRun(false);
    }
  }, [resDescData, resSelectData, run, isSuccessDescription, isSuccessSelcetion]);

  useEffect(() => {
    if (!!data && isRendering) {
      const { questions } = data;
      const resQues: ResDescription[] = [];
      const required: number[] = [];
      const selectionChk: ResSelections = {};

      questions.map((que, idx) => {
        que.required && required.push(que.id!);
        if (isDescriptionQue(que)) {
          resQues.push({
            question_id: que.id!,
            content: null,
          });
        } else {
          selectionChk[+que.id!] = {
            questionId: +que.id!,
            num: -1,
          };
        }
      });

      setChkRequired(required);
      setResDescriptionData(resQues);
      setChkSelection(selectionChk);
      setIsRendering(false);
    }
  }, [data, isRendering]);

  if (isFetching) return <div style={{ position: 'fixed', top: '50px', right: '50px' }}>Loading...</div>;
  if (isLoading) {
    return <div style={{ position: 'fixed', top: '50px', right: '50px' }}>로딩중...</div>;
  }

  return (
    <Row style={{ position: 'relative', backgroundColor: `${data?.fcolor || ''}` }}>
      <Col span={4} />
      <Col span={16}>
        {contextHolder}
        {isFetching && <div style={{ position: 'fixed', top: '50px', right: '50px' }}>Loading...</div>}
        <DirectForm onSubmit={onClickRes}>
          <FormTitle isEdit={true} formId={id} />
          {customData(data)?.map((section, row) => (
            <DragDropContext key={`section-${row}`} onDragEnd={(result) => onDragEnd(result, row)}>
              <SectionBox index={row}>
                <Droppable isDropDisabled={true} droppableId="card" type="card" direction="vertical">
                  {(provided) => (
                    <div>
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {section?.map((que, col) => (
                          <div key={que.id!.toString()}>
                            <QueDraggable
                              draggableId={que.id!.toString()}
                              data={que}
                              row={row}
                              col={col}
                              isClick={true}
                              onChangeTitle={() => {
                                true;
                              }}
                              onClickQue={onClickQue}
                              onDelete={() => {
                                true;
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </SectionBox>
            </DragDropContext>
          ))}
          <Button type={'submit'} color={'black'} bgColor={blue} fontSize={1.6} width={14} height={4.5}>
            응답하기
          </Button>
        </DirectForm>

        <MakeFromModal isCreate={isCreate} setIsCreate={setIsCreate} open={isModalOpen} onCancel={handleCancel} />
      </Col>
      <Col span={4} />
    </Row>
  );
}
