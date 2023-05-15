import React, { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getFormInfo } from '../../../api/getFormInfo';
import { GetFormInfo } from '../../../typings/getForm';
import MakeFormDirect from '../../MakeForm/Direct';
import { useRecoilState, useRecoilValue } from 'recoil';
import { formInfo, questions } from '../../../recoil/MakeForm/atom';
import { DescriptionQue, GridQue, SelectionQue } from '../../../typings/makeForm';
import { Col, Row } from 'antd';
import { AddQuestion, AddSection, DirectForm } from '../../MakeForm/Direct/styles';
import FormTitle from '../../../components/Questions/FormTitle';
import SectionBox from '../../../components/Questions/SectionBox';
import QueDraggable from '../../../components/Questions/QueDraggable/indes';
import Button from '../../../components/ui/Button';
import MakeFromModal from '../../../components/MakeForm/MakeFromModal';
import { useMessage } from '../../../hooks/useMessage';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { color } from '../../../recoil/Color/atom';
// import { DescriptionKinds, GridKinds, SelectionKinds } from '../../../typings/makeForm';

// interface GetFormInfo {
//   id: number;
//   title: string;
//   content: string;
//   fix: boolean;
//   questions: GetQuestion[];
// }
//
// interface GetQuestion {
//   title: string;
//   required: boolean;
//   sectionNum: number;
//   type: DescriptionKinds | SelectionKinds | GridKinds;
//   id: number;
//   description: GetDescription;
// }
//
// interface GetDescription {
//   id: number;
//   title: string;
//   quiz: boolean;
// }

export default function EditForm() {
  const { id } = useParams();
  const [info, setInfo] = useRecoilState(formInfo);
  const [questionList, setQuestionList] = useRecoilState(questions);

  const { data, isLoading, error, isError } = useQuery<GetFormInfo>('getFormInfo', () => getFormInfo(1, +id!), {
    onSuccess: (data) => {
      setInfo(data);
    },
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <DirectForm onSubmit={() => true}>
          <FormTitle isEdit={true} formId={id} />
        </DirectForm>

        <MakeFromModal isCreate={false} setIsCreate={() => true} open={false} onCancel={() => true} />
      </Col>
      <Col span={4}>
        <AddQuestion onClick={() => true}>
          <span>질문 추가</span>
        </AddQuestion>
        <AddSection onClick={() => true}>
          <span>섹션 추가</span>
        </AddSection>
      </Col>
    </Row>
  );
}
