import React, { ChangeEvent, useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AddQuestion, DirectForm } from './styles';
import { questions } from '../../../recoil/MakeForm/atom';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import FormTitle from '../../../components/Questions/FormTitle';
import { v4 as uuid } from 'uuid';
import MakeQueBase from '../../../components/Questions/MakeQueBase';
import Button from '../../../components/ui/Button';
import { color } from '../../../recoil/Color/atom';

export default function MakeFormDirect() {
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [nowIndex, setNowIndex] = useState(0);
  const { blue } = useRecoilValue(color);

  const addQuestion = useCallback(() => {
    const temp = [...questionList];
    temp.splice(nowIndex + 1, 0, { type: 'Description_short', id: uuid(), require: false, title: '' });

    setQuestionList(temp);
    setNowIndex((prev) => prev + 1);
  }, [nowIndex, questionList]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const temp = [...questionList];

      const start = result.source.index;
      const end = result?.destination?.index;

      const [remove] = temp.splice(start, 1);
      temp.splice(end!, 0, remove);

      setQuestionList(temp);
    },
    [questionList]
  );

  const onDelete = useCallback(
    (index: number) => {
      if (questionList.length === 1) return;

      const temp = [...questionList];
      temp.splice(index, 1);
      setQuestionList(temp);

      if (nowIndex > 0 && index <= nowIndex) {
        setNowIndex((prev) => prev - 1);
      }
    },
    [questionList, nowIndex]
  );

  const onClickQue = useCallback(
    (index: number) => {
      setNowIndex(index);
    },
    [nowIndex]
  );

  const onSubmit = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <DirectForm onSubmit={onSubmit}>
          <FormTitle />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="card" type="card" direction="vertical">
              {(provided) => (
                <div>
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {questionList.map((card, idx) => (
                      <Draggable draggableId={card.id} index={idx} key={card.id}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <MakeQueBase
                              data={card}
                              index={idx}
                              isClick={idx === nowIndex}
                              onClickQue={onClickQue}
                              onDelete={onDelete}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Button type={'submit'} color={'black'} bgColor={blue} fontSize={1.6} width={11} height={4.5}>
            폼 생성하기
          </Button>
        </DirectForm>
      </Col>
      <Col span={4}>
        <AddQuestion onClick={addQuestion}>
          <span>질문 추가</span>
        </AddQuestion>
      </Col>
    </Row>
  );
}
