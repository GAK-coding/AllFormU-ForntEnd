import React, { useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { useRecoilState } from 'recoil';
import { AddQuestion, BtnWrapper } from './styles';
import { questions } from '../../../recoil/MakeForm/atom';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import ShortQuestion from '../../../components/Questions/ShortQuestion';
import FormTitle from '../../../components/Questions/FormTitle';
import { v4 as uuid } from 'uuid';

interface Drag {
  source: { index: number };
  destination: { index: number };
}

export default function MakeFormDirect() {
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [nowIndex, setNowIndex] = useState(0);

  const addQuestion = useCallback(() => {
    const temp = [...questionList];
    temp.splice(nowIndex + 1, 0, { type: 'short', id: uuid(), require: false, title: '', answer: '' });

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
      const temp = [...questionList];
      temp.splice(index, 1);
      setQuestionList(temp);
    },
    [questionList, nowIndex]
  );

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <FormTitle />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="card" type="card" direction="vertical">
            {(provided) => (
              <div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionList.map((card, idx) => (
                    <Draggable draggableId={card.id} index={idx} key={card.id}>
                      {(provided) => (
                        <div
                          onClick={() => setNowIndex(idx)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ShortQuestion data={card} index={idx} click={idx === nowIndex} onDelete={onDelete} />
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
      </Col>
      <Col span={4}>
        <BtnWrapper>
          <AddQuestion onClick={addQuestion}>
            <span>질문 추가</span>
          </AddQuestion>
        </BtnWrapper>
      </Col>
    </Row>
  );
}
