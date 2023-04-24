import React from 'react';
import { SelectBottom, SelectBottomLeft, SelectBottomRight, SelectContainer, SelectTop, Template } from './styles';
import Button from '../../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { useNavigate } from 'react-router-dom';

const templates = [
  ['퀴즈', 'quiz'],
  ['수요조사', 'demand'],
  ['약속잡기', 'promise'],
  ['참석여부', 'attendance'],
  ['이력서', 'resume'],
  ['평가', 'evaluation'],
];

export default function MakeFormSelect() {
  const { lightPurple } = useRecoilValue(color);
  const navigate = useNavigate();

  return (
    <SelectContainer>
      <SelectTop>
        <span>새로운 설문 만들기</span>
      </SelectTop>
      <SelectBottom>
        <SelectBottomLeft onClick={() => navigate('/makeform/direct')}>
          <Button color={'white'} bgColor={lightPurple} fontSize={2} width={20} height={15}>
            <img src="/images/plus.png" alt="+" />
          </Button>
          <span>생성</span>
        </SelectBottomLeft>
        <SelectBottomRight>
          {templates.map(([name, img], index) => (
            <div key={index}>
              <Button color={'white'} bgColor={lightPurple} fontSize={2} width={20} height={15}>
                <img src={`/images/${img}.png`} alt={name} />
              </Button>
              <span>{name}</span>
            </div>
          ))}
        </SelectBottomRight>
      </SelectBottom>
    </SelectContainer>
  );
}
