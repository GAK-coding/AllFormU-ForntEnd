import React, { ChangeEvent, useCallback, useEffect, useLayoutEffect, useState } from 'react';
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
import { DESCRIPTION_SHORT } from '../../../typings/makeForm';

export default function MakeFormDirect() {
  const [questionList, setQuestionList] = useRecoilState(questions);
  // 각 섹션이 몇 번 인덱스까지 사용하는
  const [accrueQue, setAccrueQue] = useRecoilState(sectionLens);
  const [nowIndex, setNowIndex] = useState(0);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);
  const { blue } = useRecoilValue(color);

  const addQuestion = useCallback(() => {
    const temp = JSON.parse(JSON.stringify(questionList));
    const { row, col } = nowQueInfo;

    temp[row].splice(col + 1, 0, {
      type: DESCRIPTION_SHORT,
      id: uuid(),
      required: false,
      title: '뭐냐',
      sectionNum: 0,
      descriptions: [{ content: '' }],
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
      if (questionList[row].length === 1) return;

      const temp = JSON.parse(JSON.stringify(questionList));
      temp[row].splice(col, 1);
      setQuestionList(temp);

      const delIdx = row === 0 ? col : accrueQue[row - 1] + col + 1;

      if (delIdx < nowIndex || (col !== 0 && delIdx === nowIndex)) {
        setNowIndex((prev) => prev - 1);
      }
    },
    [questionList, nowIndex, accrueQue]
  );

  const onClickQue = useCallback(
    (row: number, col: number) => {
      const index = row === 0 ? col : accrueQue[row - 1] + col + 1;

      setNowIndex(index);
      setNowQueInfo({ row, col });
    },
    [nowQueInfo, nowIndex, accrueQue]
  );

  const onSubmit = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  useLayoutEffect(() => {
    const temp: number[] = [];

    for (let i = 0; i < questionList.length; i++) {
      i === 0 ? temp.push(questionList[i].length - 1) : temp.push(temp[i - 1] + questionList[i].length);
    }

    setAccrueQue(temp);
  }, [addQuestion]);

  console.log(questionList);

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <DirectForm onSubmit={onSubmit}>
          <FormTitle />
          {questionList.map((section, row) => (
            <SectionBox key={`section-${row}`} index={row}>
              <DragDropContext onDragEnd={(result) => onDragEnd(result, row)}>
                <Droppable droppableId="card" type="card" direction="vertical">
                  {(provided) => (
                    <div>
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {section.map((que, col) => (
                          <Draggable draggableId={que.id} index={col} key={que.id}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <MakeQueBase
                                  data={que}
                                  row={row}
                                  col={col}
                                  isClick={row === 0 ? col === nowIndex : accrueQue[row - 1] + col + 1 === nowIndex}
                                  onChangeTitle={onChangeTitle}
                                  onClickQue={onClickQue}
                                  onDelete={() => onDelete(row, col)}
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
