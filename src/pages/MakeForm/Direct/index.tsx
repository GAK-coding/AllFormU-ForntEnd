import React, { useState } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import FormTitle from '../../../components/Questions/FormTitle';
import { DirectWrapper, Drag, QuestionWrapper } from './styles';
import { Col, Row } from 'antd';
import ShortQuestion from '../../../components/Questions/ShortQuestion';
import { useRecoilState } from 'recoil';
import { questions } from '../../../recoil/MakeForm/atom';
import { RxDragHandleHorizontal } from 'react-icons/rx';

export default function MakeFormDirect() {
  const [isClick, setIsClick] = useState(false);
  const [questionList, setQuestionList] = useRecoilState(questions);

  const handleMouseOver = () => {
    setIsClick(true);
  };

  const handleMouseOut = () => {
    setIsClick(false);
  };

  console.log(isClick);

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <DirectWrapper>
          <FormTitle />
          <SortablePane
            onDragStart={() => {
              setIsClick(true);
            }}
            onDragStop={() => {
              setIsClick(false);
            }}
            isSortable={isClick}
            direction="vertical"
            margin={20}
          >
            {questionList.map((key) => (
              <QuestionWrapper key={key.title}>
                <Pane resizable={{ x: false, y: false, xy: false }} key={key.title}>
                  <Drag onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <RxDragHandleHorizontal />
                  </Drag>
                </Pane>
                <ShortQuestion data={key}></ShortQuestion>
              </QuestionWrapper>
            ))}
          </SortablePane>
        </DirectWrapper>
      </Col>
      <Col span={4} />
    </Row>
  );
}
