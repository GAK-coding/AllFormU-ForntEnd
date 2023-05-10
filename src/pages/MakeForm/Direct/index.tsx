import React, { ChangeEvent, FormEvent, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AddQuestion, AddSection, DirectForm } from './styles';
import {
  formInfo,
  nowQuestion,
  queSectionNum,
  questions,
  sectionLens,
  sectionNames,
} from '../../../recoil/MakeForm/atom';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import FormTitle from '../../../components/Questions/FormTitle';
import { v4 as uuid } from 'uuid';
import MakeQueBase from '../../../components/Questions/MakeQueBase';
import Button from '../../../components/ui/Button';
import { color } from '../../../recoil/Color/atom';
import SectionBox from '../../../components/Questions/SectionBox';
import { DESCRIPTION_SHORT, SectionType } from '../../../typings/makeForm';
import { useMutation } from 'react-query';
import { createForm } from '../../../api/makeform';
import MakeFromModal from '../../../components/MakeForm/MakeFromModal';

export default function MakeFormDirect() {
  const [questionList, setQuestionList] = useRecoilState(questions);
  // 각 섹션이 몇 번 인덱스까지 사용하는지
  const [accrueQue, setAccrueQue] = useRecoilState(sectionLens);
  const [nowIndex, setNowIndex] = useState(0);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);
  const { title, content } = useRecoilValue(formInfo);
  const [sectionList, setSectionList] = useRecoilState(sectionNames);
  const [queSecNum, setQueSecNum] = useRecoilState(queSectionNum);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const { blue } = useRecoilValue(color);

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(createForm);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const questions = questionList.flat().map((item) => {
        const { id, ...rest } = item;
        return rest;
      });

      mutate({ title, content: content, questions });
    },
    [title, content, questionList]
  );

  // const onChangeSectionNum = useCallback(
  //   (value: string, row: number, col: number) => {
  //     const temp = JSON.parse(JSON.stringify(questionList));
  //
  //     const [remove] = temp[row].splice(col, 1);
  //     remove.sectionNum = +value;
  //     temp[+value].push(remove);
  //
  //     if (temp[row].length === 0) {
  //       temp.splice(row, 1);
  //     }
  //     setQuestionList(temp);
  //     setNowQueInfo({ row: parseInt(value), col: temp[parseInt(value)].length - 1 });
  //     console.log(value, temp[parseInt(value)].length - 1);
  //   },
  //   [questionList, nowQueInfo]
  // );

  const addQuestion = useCallback(() => {
    const temp = JSON.parse(JSON.stringify(questionList));
    const { row, col } = nowQueInfo;

    temp[row].splice(col + 1, 0, {
      type: DESCRIPTION_SHORT,
      id: uuid(),
      required: false,
      title: '',
      sectionNum: row,
      descriptions: [{ content: '' }],
    });

    setQuestionList(temp);
    setNowIndex((prev) => prev + 1);
  }, [questionList, nowQueInfo, nowIndex]);

  console.log('Direct: ', nowQueInfo);

  const addSection = useCallback(() => {
    const temp = JSON.parse(JSON.stringify(questionList));
    const tempSectionList = JSON.parse(JSON.stringify(sectionList));

    temp.push([
      {
        type: DESCRIPTION_SHORT,
        id: uuid(),
        required: true,
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
      setNowIndex(row === 0 ? end! : accrueQue[row - 1] + 1 + end!);
      setNowQueInfo({ row: row, col: end! });
    },
    [questionList, nowIndex, accrueQue, nowQueInfo]
  );

  const onDelete = useCallback(
    (row: number, col: number) => {
      if (row === 0 && questionList[row].length === 1) return;

      const temp = JSON.parse(JSON.stringify(questionList));
      const sectionName = JSON.parse(JSON.stringify(sectionList));
      const delIdx = row === 0 ? col : accrueQue[row - 1] + col + 1;

      if (row !== 0 && questionList[row].length === 1) {
        temp.splice(row, 1);
        sectionName.splice(row, 1);
        setQuestionList(temp);
        setSectionList(sectionName);
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
      if (delIdx < nowIndex || (col !== 0 && delIdx === nowIndex)) {
        setNowIndex((prev) => prev - 1);
      }
    },
    [questionList, nowIndex, accrueQue, sectionList, queSecNum]
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

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <DirectForm>
          <FormTitle />
          {questionList.map((section, row) => (
            <DragDropContext key={`section-${row}`} onDragEnd={(result) => onDragEnd(result, row)}>
              <SectionBox index={row} section={section[0]}>
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
                                  // onChangeSectionNum={onChangeSectionNum}
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
              </SectionBox>
            </DragDropContext>
          ))}

          <Button onClick={showModal} color={'black'} bgColor={blue} fontSize={1.6} width={14} height={4.5}>
            폼 생성하기
          </Button>
          {/* <Button type={'submit'} color={'black'} bgColor={blue} fontSize={1.6} width={14} height={4.5}> */}
          {/*   폼 생성하기 */}
          {/* </Button> */}
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
