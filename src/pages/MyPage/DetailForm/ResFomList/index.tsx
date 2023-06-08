import { useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../../../recoil/Color/atom';
import { resFormInfoList } from '../../../../recoil/FormList/atom';
import { useEffect } from 'react';
import { BottomBox, ButtonWrapper, FormListWrapper, HeaderWrapper, Title } from '../styles';
import Button from '../../../../components/ui/Button';
import { resInfoList } from '../../../../typings/resForm';
import { Col, Row } from 'antd';

export default function ResFormList() {
  const { blue, lightPurple } = useRecoilValue(color);

  const setFormInfoList = useSetRecoilState(resFormInfoList);

  useEffect(() => {
    const dummyData: resInfoList[] = [
      {
        id: 1,
        title: '2023 체육대회 수요조사',
        description: 'Description 1',
      },
      {
        id: 2,
        title: '6/3 약속시간 정하기',
        description: 'Description 2',
      },
      {
        id: 3,
        title: '만족도 조사',
        description: 'Description 3',
      },
      {
        id: 4,
        title: '간식행사 수요조사',
        description: 'Description 4',
      },
    ];

    setFormInfoList(dummyData);
  }, []);

  const formInfoListData = useRecoilValue(resFormInfoList);
  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <HeaderWrapper>
          <span>내 생성폼</span>
        </HeaderWrapper>

        <FormListWrapper>
          {formInfoListData?.map((formInfo, idx) => {
            return (
              <div>
                <Title>
                  <span>{formInfo.title}</span>
                  {/* TODO: 주석 풀어야함 (데이터 받아오고 나서_ */}
                  <span>{formInfo.description}</span>
                </Title>

                <ButtonWrapper>
                  <Button color={'black'} bgColor={blue} fontSize={1.3} width={10} height={3.5}>
                    응답확인
                  </Button>
                </ButtonWrapper>
              </div>
            );
          })}
        </FormListWrapper>
        <BottomBox />
      </Col>

      <Col span={4} />
    </Row>
  );
}
