import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '../../../components/ui/Button';
import { ButtonWrapper, FormBox, FormListWrapper, HeaderWrapper, Title } from '../styles';
import { color } from '../../../recoil/Color/atom';
import { formInfoList } from '../../../recoil/FormList/atom';
import { useEffect } from 'react';
import { FormInfo } from '../../../typings/makeForm';

export default function MakeFormList() {
  const { blue, lightPurple } = useRecoilValue(color);

  const setFormInfoList = useSetRecoilState(formInfoList);

  useEffect(() => {
    const dummyData: FormInfo[] = [
      {
        title: 'Title 1',
        description: 'Description 1',
      },
      {
        title: 'Title 2',
        description: 'Description 2',
      },
      {
        title: 'Title 3',
        description: 'Description 3',
      },
      {
        title: 'Title 4',
        description: 'Description 4',
      },
    ];
    setFormInfoList(dummyData);
  }, []);

  const formInfoListData = useRecoilValue(formInfoList);

  return (
    <>
      <HeaderWrapper>
        <span>내 생성폼</span>
      </HeaderWrapper>

      <FormListWrapper>
        {formInfoListData.map((formInfo, idx) => {
          return (
            <FormBox key={idx}>
              <Title>
                <div>
                  {formInfo.title}
                  <span>{formInfo.description}</span>
                </div>
              </Title>
              <ButtonWrapper>
                <Button color={'black'} bgColor={blue} fontSize={1.3} width={10} height={3.5}>
                  응답보기
                </Button>
                <Button color={'black'} bgColor={blue} fontSize={1.3} width={10} height={3.5}>
                  결과분석
                </Button>
              </ButtonWrapper>
            </FormBox>
          );
        })}
      </FormListWrapper>
    </>
  );
}
