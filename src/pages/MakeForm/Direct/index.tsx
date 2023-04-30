import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import { Col, Row } from 'antd';
import { useRecoilState } from 'recoil';
import { RxDragHandleHorizontal } from 'react-icons/rx';
import FormTitle from '../../../components/Questions/FormTitle';
import ShortQuestion from '../../../components/Questions/ShortQuestion';
import { AddQuestion, BtnWrapper, DirectWrapper, Drag, QuestionWrapper } from './styles';
import { questions } from '../../../recoil/MakeForm/atom';
import { ShortQue } from '../../../typings/makeForm';

export default function MakeFormDirect() {
  const [isClick, setIsClick] = useState(false);
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [nowIndex, setNowIndex] = useState(0);
  const [order, setOrder] = useState<number[]>([]);

  const handleMouseOver = () => setIsClick(true);
  const handleMouseOut = () => setIsClick(false);

  const addQuestion = useCallback(() => {
    const temp = [...questionList];
    temp.splice(nowIndex + 1, 0, { type: 'short', require: false, title: '', answer: '' });

    setQuestionList(temp);
    setNowIndex((prev) => prev + 1);
  }, [nowIndex, questionList]);

  const [isDragging, setIsDragging] = useState(false);

  function sortByOrder(a: number[], b: ShortQue[]) {
    const orderMap: Record<number, number> = {};
    for (let i = 0; i < a.length; i++) {
      orderMap[a[i]] = i;
    }

    const sortedB = b.sort((x, y) => orderMap[b.indexOf(x)] - orderMap[b.indexOf(y)]);
    return sortedB;
  }

  useEffect(() => {
    if (order.length === 0) return;
    setQuestionList(sortByOrder(order, [...questionList]));
  }, [order]);

  console.log(questionList);

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <DirectWrapper>
          <FormTitle />
          <SortablePane
            onDragStart={(e, ui) => {
              setIsDragging(true);
              console.log('드래그 시작: ', ui);
            }}
            onDragStop={(e, ui) => {
              setIsDragging(false);
              console.log('드래그 끝: ', ui);
            }}
            onOrderChange={(e) => setOrder(e.map((str) => Number(str)))}
            isSortable={isClick}
            direction="vertical"
            margin={20}
          >
            {questionList.map((key, index) => (
              <QuestionWrapper key={index} onClick={() => setNowIndex(index)}>
                <Pane resizable={{ x: false, y: false, xy: false }} key={key.title}>
                  <Drag onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <RxDragHandleHorizontal />
                  </Drag>
                </Pane>
                <ShortQuestion data={key} index={index} click={index === nowIndex} />
              </QuestionWrapper>
            ))}
          </SortablePane>
        </DirectWrapper>
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
