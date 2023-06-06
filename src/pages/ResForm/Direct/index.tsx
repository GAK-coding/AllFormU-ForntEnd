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
import { ResDescription, ResSelection } from '../../../typings/resForm';
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
  const [resSelectionData, setResSelectionData] = useRecoilState(resSelectionSets);
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

  const { mutate: resDescriptionMutate, data: resDescData, isSuccess: isDescription } = useMutation(createDescription);
  const { mutate: resSelectionMutate, data: resSelectData, isSuccess: isSelect } = useMutation(createSelection);

  useEffect(() => {
    if (resDescData?.httpStatus === 'CONFLICT' || resSelectData?.httpStatuss === 'FORBINDDEN') {
      showMessage('error', '이미 응답한 설문입니다.');
      return;
    } else {
      showMessage('success', '응답 완료!');
      // navigate('/mypage');
      return;
    }
    // showMessage('success', '응답 완료!');
  }, [isDescription, isSelect]);

  const onClickRes = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();

      const required = JSON.parse(JSON.stringify(chkRequired));
      const descriptionData: ResDescription[] = [];
      const selectionData: ResSelection[] = [];

      for (const data of resDescriptionData) {
        if (required.includes(data.question_id)) {
          if (data.content === '') break;

          required.splice(required.indexOf(data.question_id), 1);
        }
        if (data.content !== '') descriptionData.push(data);
      }

      Object.values(resSelectionData).map((data: ResSelection | ResSelection[]) => {
        if (Array.isArray(data)) {
          if (required.includes(data[0].questionId)) required.splice(required.indexOf(data[0].questionId), 1);

          selectionData.push(...data.flat());
        } else {
          if (required.includes(+Object.keys(data)[0])) required.splice(required.indexOf(+Object.keys(data)[0]), 1);

          selectionData.push(...Object.values(data));
        }
      });

      if (required.length !== 0) {
        showMessage('warning', '필수 질문에 답변해주세요.');
        return;
      }

      if (
        (chkSelection.length === 0 && resDescriptionData.length !== 0 && descriptionData.length === 0) ||
        (resDescriptionData.length === 0 && chkSelection.length !== 0 && selectionData.length === 0)
      ) {
        showMessage('warning', '답변한 질문이 없습니다.');
        return;
      }

      resDescriptionData.length !== 0 &&
        resDescriptionMutate({ formId: +id!, memberId: user.id, forms: descriptionData });
      chkSelection.length !== 0 && resSelectionMutate({ formId: +id!, memberId: user.id, forms: selectionData });

      // showMessage('success', '응답 완료!');
    },
    [resDescriptionData, chkRequired, resSelectionData, chkSelection]
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
    if (!!data && isRendering) {
      const { questions } = data;
      const resQues: ResDescription[] = [];
      const required: number[] = [];
      const selectionChk: ResSelection[] = [];

      questions.map((que, idx) => {
        que.required && required.push(que.id!);
        if (isDescriptionQue(que)) {
          resQues.push({
            question_id: que.id!,
            content: '',
          });
        } else {
          selectionChk.push({
            questionId: que.id!,
            num: null,
          });
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
