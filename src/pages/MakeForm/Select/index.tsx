import React, { useCallback } from 'react';
import { SelectBottom, SelectBottomLeft, SelectBottomRight, SelectContainer, SelectTop, Template } from './styles';
import Button from '../../../components/ui/Button';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  attendanceTemplate,
  demandTemplate,
  evaluationTemplate,
  formFix,
  formInfo,
  nowFocusIndex,
  nowQuestion,
  promiseTemplate,
  queSectionNum,
  questions,
  resumeTemplate,
  sectionLens,
  sectionNames,
} from '../../../recoil/MakeForm/atom';
import { DESCRIPTION_SHORT } from '../../../typings/makeForm';
import { v4 as uuid } from 'uuid';

const templates = [
  ['퀴즈', 'quiz'],
  ['수요조사', 'demand'],
  ['약속잡기', 'promise'],
  ['참석여부', 'attendance'],
  ['이력서', 'resume'],
  ['평가', 'evaluation'],
];

export default function MakeFormSelect() {
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useRecoilState(questions);
  const promise = useRecoilValue(promiseTemplate);
  const attendance = useRecoilValue(attendanceTemplate);
  const resume = useRecoilValue(resumeTemplate);
  const evaluation = useRecoilValue(evaluationTemplate);
  const demand = useRecoilValue(demandTemplate);

  const setInfo = useSetRecoilState(formInfo);
  const setSecNames = useSetRecoilState(sectionNames);
  const setLens = useSetRecoilState(sectionLens);
  const setFix = useSetRecoilState(formFix);
  const setNowQueInfo = useSetRecoilState(nowQuestion);
  const setNotIndex = useSetRecoilState(nowFocusIndex);
  const setQueSecNum = useSetRecoilState(queSectionNum);

  const onClick = useCallback((type: string) => {
    if (type === 'promise') setQuestionList(promise);
    else if (type === 'attendance') setQuestionList(attendance);
    else if (type === 'resume') setQuestionList(resume);
    else if (type === 'evaluation') setQuestionList(evaluation);
    else if (type === 'demand') setQuestionList(demand);
    else {
      setQuestionList([
        [
          {
            type: DESCRIPTION_SHORT,
            tempId: uuid(),
            required: false,
            title: '',
            sectionNum: 0,
            descriptions: [{ content: '' }],
          },
        ],
      ]);
      setInfo({ title: '제발', content: '제발' });
      setSecNames(['']);
      setLens([]);
      setFix(false);
      setNowQueInfo({ row: 0, col: 0 });
      setNotIndex(0);
      setQueSecNum([{ value: '0', label: '1' }]);
    }

    navigate('/makeform/direct');
  }, []);

  return (
    <SelectContainer>
      <SelectTop>
        <span>새로운 설문 만들기</span>
      </SelectTop>
      <SelectBottom>
        <SelectBottomLeft onClick={() => onClick('')}>
          <Button color={'black'} bgColor={'white'} fontSize={2} width={'12vw'} height={'18vh'}>
            <AiOutlinePlus />
          </Button>
          <span>생성</span>
        </SelectBottomLeft>
        <SelectBottomRight>
          {templates.map(([name, type], index) => (
            <div key={index} onClick={() => onClick(type)}>
              <Button color={'white'} bgColor={'white'} fontSize={2} width={'12vw'} height={'18vh'}>
                <img src={`/images/${type}.png`} alt={name} />
              </Button>
              <span>{name}</span>
            </div>
          ))}
        </SelectBottomRight>
      </SelectBottom>
    </SelectContainer>
  );
}
