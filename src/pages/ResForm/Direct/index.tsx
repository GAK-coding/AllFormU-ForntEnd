import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { checkRequired, resDescriptionSets } from '../../../recoil/Resform/atom';
import { ResDescription, ResSelection } from '../../../typings/resForm';
import { createDescription } from '../../../api/resFrom';
import { useMutation } from 'react-query';

function isDescriptionQue(que: DescriptionQue | SelectionQue | GridQue): que is DescriptionQue {
  return (
    que.type === DESCRIPTION_SHORT ||
    que.type === DESCRIPTION_LONG ||
    que.type === DESCRIPTION_DATE ||
    que.type === DESCRIPTION_TIME ||
    que.type === DESCRIPTION_IMG
  );
}

export default function EditForm() {
  const { id } = useParams();
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [data, isLoading, isFetching] = useGetSingleForm(id!);
  const [isRendering, setIsRendering] = useState(true);
  const [resData, setResData] = useRecoilState(resDescriptionSets);
  const [chkRequired, setChkRequired] = useRecoilState(checkRequired);

  const [accrueQue, setAccrueQue] = useRecoilState(sectionLens);
  const [nowIndex, setNowIndex] = useRecoilState(nowFocusIndex);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { showMessage, contextHolder } = useMessage();
  const { blue } = useRecoilValue(color);

  const { mutate: resDescriptionMutate } = useMutation(createDescription);

  const onClickRes = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      //TODO: 멤버 하드코딩됨
      e.preventDefault();
      resDescriptionMutate({ formId: +id!, memberId: 4, forms: resData });
    },
    [resData]
  );

  const showModal = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsModalOpen(true);
  }, []);

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

      questions.map((que, idx) => {
        que.required && required.push(que.id!);
        if (isDescriptionQue(que)) {
          resQues.push({
            question_id: que.id!,
            content: '',
          });
        }
        // else {
        //   resQues.push({
        //     // TODO: 유저 id 부분 하드코딩됨
        //     responsorId: 152,
        //     questionId: que.id!,
        //     num: null,
        //   });
        // }
      });

      setChkRequired(required);
      setResData(resQues);
      setIsRendering(false);
    }
  }, [data, isRendering]);

  if (isFetching) return <div style={{ position: 'fixed', top: '50px', right: '50px' }}>Loading...</div>;
  if (isLoading) {
    return <div style={{ position: 'fixed', top: '50px', right: '50px' }}>로딩중...</div>;
  }

  return (
    <Row style={{ position: 'relative' }}>
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
