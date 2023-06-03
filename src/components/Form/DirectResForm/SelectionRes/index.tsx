import React from 'react';
import {
  SELECTION_CHECKBOX,
  SELECTION_DROPDOWN,
  SELECTION_LINEAR,
  SELECTION_OPTION,
  SelectionQue,
} from '../../../../typings/makeForm';
import { QueWrapper } from '../../Questions/MakeQueBase/styles';
import QueTitle from '../QueTitle';
import { SelectionResWrapper } from './styles';
import Option from '../SelectionTypes/Option';
import CheckBox from '../SelectionTypes/CheckBox';
import DropDown from '../SelectionTypes/DropDown';
import Linear from '../SelectionTypes/Linear';

interface Props {
  data: SelectionQue;
  row: number;
  col: number;
  isClick: boolean;
  onClickQue: (row: number, col: number) => void;
}

export default function SelectionRes({ data, row, col, isClick, onClickQue }: Props) {
  return (
    <QueWrapper>
      <SelectionResWrapper>
        <QueTitle data={data} />
        {data.type === SELECTION_OPTION && <Option data={data} id={data.id!} />}
        {data.type === SELECTION_CHECKBOX && <CheckBox data={data} id={data.id!} />}
        {data.type === SELECTION_DROPDOWN && <DropDown data={data} id={data.id!} />}
        {data.type === SELECTION_LINEAR && <Linear data={data} id={data.id!} />}
      </SelectionResWrapper>
    </QueWrapper>
  );
}
