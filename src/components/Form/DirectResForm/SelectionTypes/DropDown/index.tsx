import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SelectionQue } from '../../../../../typings/makeForm';
import { DropDownWrapper } from './styles';
import { Select } from 'antd';
import { TbTriangleInverted } from 'react-icons/tb';
import { useRecoilState } from 'recoil';
import { resSelectionSets } from '../../../../../recoil/Resform/atom';

interface Props {
  data: SelectionQue;
  id: number;
}

export default function DropDown({ data, id }: Props) {
  const plainOptions = [
    { value: '', label: '선택 안함' },
    ...data.options.map((option) => {
      return { value: option.content, label: option.content };
    }),
  ];
  const [value, setValue] = useState(plainOptions[0].value);
  const [resData, setResData] = useRecoilState(resSelectionSets);
  const ref = useRef<number | null>(null);

  const handleChange = useCallback((value: string) => {
    setValue(value);
    ref.current = plainOptions.findIndex((option) => option.value === value) - 1;
  }, []);

  useEffect(() => {
    const temp = JSON.parse(JSON.stringify(resData));
    const resDataKeys = Object.keys(resData);
    const isRes = resDataKeys.find((key) => ref.current === +key);

    if (value === '') {
      delete temp[id];
      setResData(temp);
      return;
    }

    if (!isRes) {
      temp[id] = {
        [id]: {
          questionId: id,
          num: ref.current,
        },
      };

      setResData(temp);
    } else {
      setResData({
        ...temp,

        [id]: {
          questionId: id,
          num: ref.current,
        },
      });
    }
  }, [value, ref]);

  return (
    <DropDownWrapper>
      <Select
        className="custom-select"
        value={value}
        style={{ width: 135 }}
        onChange={handleChange}
        options={plainOptions}
        suffixIcon={<TbTriangleInverted />}
      />
    </DropDownWrapper>
  );
}
