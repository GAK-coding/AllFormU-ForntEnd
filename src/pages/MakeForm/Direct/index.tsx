import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AddQuestion, DirectForm } from './styles';
import { nowQuestion, questions, sectionLens } from '../../../recoil/MakeForm/atom';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import FormTitle from '../../../components/Questions/FormTitle';
import { v4 as uuid } from 'uuid';
import MakeQueBase from '../../../components/Questions/MakeQueBase';
import Button from '../../../components/ui/Button';
import { color } from '../../../recoil/Color/atom';
import SectionBox from '../../../components/Questions/SectionBox';

export default function MakeFormDirect() {
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [accrueQue, setAccrueQue] = useRecoilState(sectionLens);
  const [nowIndex, setNowIndex] = useState(0);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);
  const { blue } = useRecoilValue(color);

  const addQuestion = useCallback(() => {
    const temp = JSON.parse(JSON.stringify(questionList));
    const { row, col } = nowQueInfo;

    temp[row].splice(col + 1, 0, {
      type: 'Description_short',
      id: uuid(),
      require: false,
      title: '',
      section: row,
    });

    setQuestionList(temp);
    setNowIndex((prev) => prev + 1);
  }, [questionList, nowQueInfo]);

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>, name: 'title', row: number, col: number) => {
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[row][col][name] = e.target.value;
      setQuestionList(temp);
    },
    [questionList]
  );

  const onDragEnd = useCallback(
    (result: DropResult, row: number) => {
      const temp = JSON.parse(JSON.stringify(questionList));

      const start = result.source.index;
      const end = result?.destination?.index;

      const [remove] = temp[row].splice(start, 1);
      temp[row].splice(end!, 0, remove);

      setQuestionList(temp);
    },
    [questionList]
  );

  const onDelete = useCallback(
    (row: number, col: number) => {
      if (questionList.length === 1) return;

      const temp = [...questionList];
      temp[row].splice(col, 1);
      setQuestionList(temp);

      if (nowIndex > 0 && accrueQue[row] + col <= nowIndex) {
        setNowIndex((prev) => prev - 1);
      }
    },
    [questionList, nowIndex]
  );

  const onClickQue = useCallback(
    (index: number, row: number, col: number) => {
      setNowIndex(index);
      setNowQueInfo({ row, col });
    },
    [nowQueInfo, nowIndex]
  );

  const onSubmit = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    const temp: number[] = [];

    for (let i = 0; i < questionList.length; i++) {
      i === 0 ? temp.push(questionList[i].length) : temp.push(temp[i - 1] + questionList[i].length);
    }

    setAccrueQue(temp);
  }, []);

  console.log(questionList);

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <DirectForm onSubmit={onSubmit}>
          <FormTitle />
          {questionList.map((section, index) => (
            <SectionBox key={section[0].id} index={index}>
              <DragDropContext onDragEnd={(result) => onDragEnd(result, index)}>
                <Droppable droppableId="card" type="card" direction="vertical">
                  {(provided) => (
                    <div>
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {section.map((que, idx) => (
                          <Draggable draggableId={que.id} index={idx} key={que.id}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <MakeQueBase
                                  data={que}
                                  row={index}
                                  col={idx}
                                  isClick={index === 0 ? idx === nowIndex : accrueQue[index - 1] + idx === nowIndex}
                                  onChangeTitle={onChangeTitle}
                                  onClickQue={onClickQue}
                                  onDelete={() => onDelete(index, idx)}
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
            </SectionBox>
          ))}

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
