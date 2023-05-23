import React, { FormEvent, useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { DescriptionQue, GridQue, SelectionQue } from '../../../typings/makeForm';
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

export default function EditForm() {
  const { id } = useParams();
  const [info, setInfo] = useRecoilState(formInfo);
  const [questionList, setQuestionList] = useRecoilState(questions);
  const queTypes = useRecoilValue(questionTypes);

  const [data, isLoading, isFetching] = useGetSingleForm(id!);

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
        <DirectForm onSubmit={showModal}>
          <FormTitle isEdit={true} formId={id} />
          {customData(data)?.map((section, row) => (
            <DragDropContext key={`section-${row}`} onDragEnd={(result) => onDragEnd(result, row)}>
              <SectionBox index={row}>
                <Droppable isDropDisabled={true} droppableId="card" type="card" direction="vertical">
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
                                    true;
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
      <Col span={4} />
    </Row>
  );
}
