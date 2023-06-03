import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LinearWrapper, RadioGroup } from './styles';
import { Radio, RadioChangeEvent } from 'antd';
import { SelectionQue } from '../../../../../typings/makeForm';
import { useRecoilState } from 'recoil';
import { resSelectionSets } from '../../../../../recoil/Resform/atom';

interface Props {
  data: SelectionQue;
  id: number;
}

export default function Linear({ data, id }: Props) {
  const [resData, setResData] = useRecoilState(resSelectionSets);
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // 선택된 라디오 버튼의 인덱스를 추적하는 상태
  const ref = useRef<number | null>(null);

  const handleRadioChange = useCallback((e: RadioChangeEvent) => {
    const selectedIndex = parseInt(e.target.value); // 선택된 라디오 버튼의 인덱스
    setSelectedOption(selectedIndex); // 선택된 라디오 버튼의 인덱스를 상태에 업데이트
  }, []);

  useEffect(() => {
    if (selectedOption === null) return;

    const temp = JSON.parse(JSON.stringify(resData));
    const resDataKeys = Object.keys(resData);
    const isRes = resDataKeys.find((key) => ref.current === +key);

    if (!isRes) {
      //TODO: responsorId가 하드코딩됨

      temp[id] = {
        [id]: {
          responsorId: 152,
          questionId: id,
          num: ref.current,
        },
      };

      setResData(temp);
    } else {
      setResData({
        ...temp,

        [id]: {
          responsorId: 152,
          questionId: id,
          num: ref.current,
        },
      });
    }
  }, [selectedOption, ref]);

  console.log(resData);

  return (
    <LinearWrapper>
      <RadioGroup name="radiogroup" onChange={handleRadioChange}>
        {data.options.map((option, idx) => {
          if (option.id === selectedOption) ref.current = idx;

          return (
            <Radio key={option.id} value={option.id}>
              {option.content}
            </Radio>
          );
        })}
      </RadioGroup>
    </LinearWrapper>
  );
}
