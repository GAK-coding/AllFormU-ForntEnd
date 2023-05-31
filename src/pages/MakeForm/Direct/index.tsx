import React, { ChangeEvent, FormEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Col, message, Row } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AddQuestion, AddSection, DirectForm } from './styles';
import {
  nowFocusIndex,
  nowQuestion,
  queSectionNum,
  questions,
  sectionLens,
  sectionNames,
} from '../../../recoil/MakeForm/atom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import Button from '../../../components/ui/Button';
import { color } from '../../../recoil/Color/atom';
import { DESCRIPTION_SHORT, DescriptionQue, GridQue, SelectionQue } from '../../../typings/makeForm';
import { useMessage } from '../../../hooks/useMessage';
import QueDraggable from '../../../components/Form/Questions/QueDraggable';
import MakeFromModal from '../../../components/Form/MakeForm/MakeFromModal';
import SectionBox from '../../../components/Form/Questions/SectionBox';
import FormTitle from '../../../components/Form/Questions/FormTitle';
import { useLocation } from 'react-router-dom';
import { detailChat } from '../../../recoil/Chatbot/atom';

export default function MakeFormDirect() {
  const [questionList, setQuestionList] = useRecoilState(questions);
  // 각 섹션이 몇 번 인덱스까지 사용하는지
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

  const { state } = useLocation();
  const [isRendering, setIsRendering] = useState(true);
  const detailMessage = useRecoilValue(detailChat);

  useEffect(() => {
    if (isRendering && state) {
      const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));

      for (let i = 0; i < detailMessage.length; i = i + 2) {
        const sectionTitle = detailMessage[i].message;
        const queNum = detailMessage[i + 1].message;
        const sectionIndex = i / 2;

        if (sectionIndex === 0) {
          setSectionList([sectionTitle]);
        }
        // 첫 번째가 아닌 경우엔 섹션 생성
        else {
          temp.push([
            {
              type: DESCRIPTION_SHORT,
              tempId: uuid(),
              required: false,
              title: '',
              sectionNum: temp.length,
              descriptions: [{ content: '' }],
            },
          ]);
          setSectionList((prev) => [...prev, sectionTitle]);
          setQueSecNum((prev) => [...prev, { value: sectionIndex.toString(), label: (sectionIndex + 1).toString() }]);
        }

        // 질문개수 추가
        for (let j = 0; j < +queNum.slice(0, 1) - 1; j++) {
          temp[sectionIndex].push({
            type: DESCRIPTION_SHORT,
            tempId: uuid(),
            required: false,
            title: '',
            sectionNum: 0,
            descriptions: [{ content: '' }],
          });
        }
      }

      // 렌더링 false로 변경
      // json형식 다시 변경
      setIsRendering(false);
      setQuestionList(temp);
    }
  }, [detailChat]);

  const showModal = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const addQuestion = useCallback(() => {
    const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));
    const { row, col } = nowQueInfo;

    let queSum = 0;
    questionList.map((que) => (queSum += que.length));
    if (queSum >= 100) {
      showMessage('warning', '질문은 100개까지만 등록 가능합니다.');
      return;
    }

    temp[row].splice(col + 1, 0, {
      type: DESCRIPTION_SHORT,
      tempId: uuid(),
      required: false,
      title: '',
      sectionNum: row,
      descriptions: [{ content: '' }],
    });

    setQuestionList(temp);
    setNowQueInfo({ row: row, col: col + 1 });
    setNowIndex((prev) => prev + 1);
  }, [questionList, nowQueInfo, nowIndex, nowQueInfo]);

  const addSection = useCallback(() => {
    const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));
    const tempSectionList: string[] = JSON.parse(JSON.stringify(sectionList));

    let queSum = 0;
    questionList.map((que) => (queSum += que.length));
    if (queSum >= 100) {
      showMessage('warning', '질문은 100개까지만 등록 가능합니다.');
      return;
    }

    if (questionList.length >= 5) {
      showMessage('warning', '섹션은 5개까지만 등록 가능합니다.');
      return;
    }

    temp.push([
      {
        type: DESCRIPTION_SHORT,
        tempId: uuid(),
        required: false,
        title: '',
        sectionNum: temp.length,
        descriptions: [{ content: '' }],
      },
    ]);

    setQuestionList(temp);
    setQueSecNum((prev) => [...prev, { value: queSecNum.length.toString(), label: (queSecNum.length + 1).toString() }]);
    setSectionList([...tempSectionList, '']);
    setNowQueInfo({ row: temp.length - 1, col: 0 });
    setNowIndex(accrueQue[accrueQue.length - 1] + 1);
  }, [questionList, nowIndex, accrueQue, nowQueInfo, sectionList, queSecNum]);

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>, name: 'title', row: number, col: number) => {
      const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));
      temp[row][col][name] = e.target.value;
      setQuestionList(temp);
    },
    [questionList]
  );

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

  const onDelete = useCallback(
    (row: number, col: number) => {
      if (row === 0 && questionList[row].length === 1) {
        showMessage('warning', '질문은 최소 1개 이상이어야 합니다.');
        return;
      }

      const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));
      const sectionName: string[] = JSON.parse(JSON.stringify(sectionList));
      const delIdx = row === 0 ? col : accrueQue[row - 1] + col + 1;

      if (row !== 0 && questionList[row].length === 1) {
        temp.splice(row, 1);
        sectionName.splice(row, 1);
        setQuestionList(temp);
        setSectionList(sectionName);
        if (col === 0) {
          setNowQueInfo({ row: row - 1, col: questionList[row - 1].length - 1 });
        }
        setQueSecNum((prev) => {
          const temp = [...prev];
          temp.pop();

          return temp;
        });

        if (delIdx === nowIndex) {
          setNowIndex((prev) => prev - 1);
        }
        return;
      }

      temp[row].splice(col, 1);
      setQuestionList(temp);
      setNowQueInfo({ row: row, col: col - 1 });
      if (delIdx < nowIndex || (col !== 0 && delIdx === nowIndex)) {
        setNowIndex((prev) => prev - 1);
      }
    },
    [questionList, nowIndex, accrueQue, sectionList, queSecNum, nowQueInfo]
  );

  const onClickQue = useCallback(
    (row: number, col: number) => {
      const index = row === 0 ? col : accrueQue[row - 1] + col + 1;

      setNowIndex(index);
      setNowQueInfo({ row, col });
    },
    [nowQueInfo, nowIndex, accrueQue]
  );

  useLayoutEffect(() => {
    const temp: number[] = [];

    for (let i = 0; i < questionList.length; i++) {
      i === 0 ? temp.push(questionList[i].length - 1) : temp.push(temp[i - 1] + questionList[i].length);
    }

    setAccrueQue(temp);
  }, [addQuestion]);

  console.log(questionList, nowQueInfo);

  useLayoutEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [questionList]);

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        {contextHolder}
        <DirectForm onSubmit={showModal}>
          <FormTitle />
          {questionList.map((section, row) => (
            <DragDropContext key={`section-${row}`} onDragEnd={(result) => onDragEnd(result, row)}>
              <SectionBox index={row}>
                <Droppable droppableId="card" type="card" direction="vertical">
                  {(provided) => (
                    <div>
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {section.map((que, col) => {
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
                                  onChangeTitle={onChangeTitle}
                                  onClickQue={onClickQue}
                                  onDelete={onDelete}
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
                                onChangeTitle={onChangeTitle}
                                onClickQue={onClickQue}
                                onDelete={onDelete}
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
      <Col span={4}>
        <AddQuestion onClick={addQuestion}>
          <span>질문 추가</span>
        </AddQuestion>
        <AddSection onClick={addSection}>
          <span>섹션 추가</span>
        </AddSection>
      </Col>
    </Row>
  );
}
