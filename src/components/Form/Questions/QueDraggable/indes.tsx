import React, { ChangeEvent } from 'react';
import MakeQueBase from '../MakeQueBase';
import { Draggable } from 'react-beautiful-dnd';
import { DescriptionQue, GridQue, SelectionQue } from '../../../../typings/makeForm';
import { useLocation } from 'react-router-dom';

interface Props {
  draggableId: string;
  data: DescriptionQue | SelectionQue | GridQue;
  row: number;
  col: number;
  isClick: boolean;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>, name: 'title', row: number, col: number) => void;
  onClickQue: (row: number, col: number) => void;
  onDelete: (row: number, col: number) => void;
}

export default function QueDraggable({
  draggableId,
  data,
  row,
  col,
  isClick,
  onChangeTitle,
  onClickQue,
  onDelete,
}: Props) {
  return (
    <Draggable draggableId={draggableId} index={col}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <MakeQueBase
            data={data}
            row={row}
            col={col}
            isClick={isClick}
            onChangeTitle={onChangeTitle}
            onClickQue={onClickQue}
            onDelete={() => onDelete(row, col)}
          />
        </div>
      )}
    </Draggable>
  );
}
