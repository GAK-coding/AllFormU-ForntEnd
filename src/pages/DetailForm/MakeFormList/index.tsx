import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '../../../components/ui/Button';
import { ButtonWrapper, FormListWrapper, HeaderWrapper, Title } from '../styles';
import { color } from '../../../recoil/Color/atom';
import { useCallback, useEffect } from 'react';
import { makeInfoList } from '../../../typings/makeForm';
import { makeFormInfoList } from '../../../recoil/FormList/atom';
import { useMutation, useQuery } from 'react-query';
import { deleteFrom, getMakeForms } from '../../../api/getFormInfo';
import { Col, Row } from 'antd';
import { createForm } from '../../../api/makeform';
import { getForm } from '../../../typings/getForm';

export default function MakeFormList() {
  const { blue, lightPurple } = useRecoilValue(color);

  const { data: makeFormInfo, isLoading, error, isError } = useQuery<getForm[]>('myMakeForm', getMakeForms);

  const {
    mutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    error: deleteError,
    isSuccess: deleteIsSuccess,
  } = useMutation(deleteFrom);

  const deleteForm = useCallback((id: number) => {
    mutate(id);
  }, []);

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <HeaderWrapper>
          <span>내 생성폼</span>
        </HeaderWrapper>

        <FormListWrapper>
          {makeFormInfo?.map((formInfo: any) => {
            return (
              <div key={formInfo.id}>
                <Title>
                  <span>{formInfo.title}</span>
                  <span>{formInfo.content}</span>
                </Title>

                <ButtonWrapper>
                  <div>
                    <Button color={'black'} bgColor={blue} fontSize={1.3} width={10} height={3.5}>
                      응답보기
                    </Button>
                    <Button color={'black'} bgColor={blue} fontSize={1.3} width={10} height={3.5}>
                      결과분석
                    </Button>
                  </div>
                  <div>
                    <Button color={'black'} bgColor={lightPurple} fontSize={1.3} width={4} height={8}>
                      수정
                    </Button>
                    <Button
                      onClick={() => deleteForm(formInfo.id)}
                      color={'black'}
                      bgColor={lightPurple}
                      fontSize={1.3}
                      width={4}
                      height={8}
                    >
                      삭제
                    </Button>
                  </div>
                </ButtonWrapper>
              </div>
            );
          })}
        </FormListWrapper>
      </Col>

      <Col span={4} />
    </Row>
  );
}
