import React, { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getFormInfo } from '../../../api/getFormInfo';
import { GetFormInfo } from '../../../typings/getForm';
import { useRecoilState } from 'recoil';
import {
  nowFocusIndex,
  nowQuestion,
  queSectionNum,
  questions,
  sectionLens,
  sectionNames,
} from '../../../recoil/MakeForm/atom';
import { DESCRIPTION_SHORT, DescriptionQue, GridQue, SelectionQue } from '../../../typings/makeForm';
import { Col, Row } from 'antd';
import { AddQuestion, AddSection, DirectForm } from '../../MakeForm/Direct/styles';
import { useMessage } from '../../../hooks/useMessage';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import { deleteQue } from '../../../api/editForm';
import QueDraggable from '../../../components/Form/Questions/QueDraggable';
import SectionBox from '../../../components/Form/Questions/SectionBox';
import FormTitle from '../../../components/Form/Questions/FormTitle';
import { useGetSingleForm } from '../../../components/Form/hooks/useGetSingleForm';
import { customData } from '../../../utils/customData';

export default function EditForm() {
  const { id } = useParams();
  const [questionList, setQuestionList] = useRecoilState(questions);
  const queryClient = useQueryClient();
  const { showMessage, contextHolder } = useMessage();

  const [data, isLoading, isFetching] = useGetSingleForm(id!);

  const { mutate: deleteQueMutate, isLoading: deleteQueIsLoading } = useMutation(
    (queId: number) => deleteQue(+id!, queId),
    {
      onMutate: async (queId) => {
        await queryClient.cancelQueries(['getFormInfo', id]);

        const snapshot: GetFormInfo | undefined = queryClient.getQueryData(['getFormInfo', id]);

        const deleteInfo = { ...snapshot }.questions?.filter(
          (info: DescriptionQue | SelectionQue | GridQue) => queId !== info.id
        );

        queryClient.setQueryData(['getFormInfo', id], {
          ...snapshot,
          deleteInfo,
        });

        setQuestionList(customData(data!));

        return { snapshot };
      },
      onError: (error, newData, context) => {
        if (context?.snapshot) {
          queryClient.setQueryData(['getFormInfo', id], context?.snapshot);
          setQuestionList(customData({ ...context?.snapshot }));
          alert('수정 실패!');
        }
      },
      onSettled() {
        queryClient.invalidateQueries(['getFormInfo', id]);
      },
    }
  );

  const deleteQuestion = useCallback(
    (id: number) => {
      if (data?.questions?.length === 1) {
        showMessage('warning', '설문지에 질문이 하나 이상 있어야 합니다.');
        return;
      }

      const confirm = window.confirm('정말 삭제하시겠습니까?');
      confirm && deleteQueMutate(id);
      showMessage('success', '삭제되었습니다.');
    },
    [data]
  );

  // 각 섹션이 몇 번 인덱스까지 사용하는지
  const [accrueQue, setAccrueQue] = useRecoilState(sectionLens);
  const [nowIndex, setNowIndex] = useRecoilState(nowFocusIndex);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);

  const onClickQue = useCallback(
    (row: number, col: number) => {
      const index = row === 0 ? col : accrueQue[row - 1] + col + 1;

      // setNowIndex(index);
      setNowQueInfo({ row, col });
    },
    [nowQueInfo, nowIndex, accrueQue]
  );

  useEffect(() => {
    setQuestionList(customData(data!));
  }, [data]);

  if (isLoading) {
    return <div style={{ position: 'fixed', top: '50px', right: '50px' }}>로딩중...</div>;
  }

  return (
    <Row style={{ position: 'relative', backgroundColor: `${data.fcolor || ''}` }}>
      <Col span={4} />
      <Col span={16}>
        {contextHolder}
        {isFetching && <div style={{ position: 'fixed', top: '50px', right: '50px' }}>Loading...</div>}

        <DirectForm>
          <FormTitle isEdit={true} formId={id} />
          {questionList?.map((section: (DescriptionQue | SelectionQue | GridQue)[], row: number) => (
            <DragDropContext key={`section-${row}`} onDragEnd={() => true}>
              <SectionBox index={row}>
                <Droppable droppableId="card" type="card" direction="vertical">
                  {(provided) => (
                    <div>
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {section?.map((que, col) => {
                          return (
                            <div key={que.tempId}>
                              <QueDraggable
                                draggableId={que.tempId}
                                data={que}
                                row={row}
                                col={col}
                                isClick={false}
                                onChangeTitle={() => {
                                  true;
                                }}
                                onClickQue={onClickQue}
                                onDelete={() => {
                                  deleteQuestion(que.id!);
                                }}
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
        </DirectForm>
      </Col>
      <Col span={4} />
    </Row>
  );
}
