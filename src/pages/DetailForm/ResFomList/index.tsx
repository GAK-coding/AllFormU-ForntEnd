import { useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { resFormInfoList } from '../../../recoil/FormList/atom';
import { useEffect } from 'react';
import { ButtonView, FormBox, FormListWrapper, HeaderWrapper, Title } from '../styles';
import Button from '../../../components/ui/Button';
import { resInfoList } from '../../../typings/resForm';

export default function ResFormList() {
  const { blue } = useRecoilValue(color);

  const setFormInfoList = useSetRecoilState(resFormInfoList);

  useEffect(() => {
    const dummyData: resInfoList[] = [
      {
        id: 1,
        title: 'Title 1',
        description: 'Description 1',
      },
      {
        id: 2,
        title: 'Title 2',
        description: 'Description 2',
      },
      {
        id: 3,
        title: 'Title 3',
        description: 'Description 3',
      },
      {
        id: 4,
        title: 'Title 4',
        description: 'Description 4',
      },
    ];

    setFormInfoList(dummyData);
  }, []);

  const formInfoListData = useRecoilValue(resFormInfoList);

  return (
    <>
      <HeaderWrapper>
        <span>내 응답폼</span>
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

              <ButtonView>
                <Button color={'black'} bgColor={blue} fontSize={1.3} width={10} height={3.5}>
                  응답확인
                </Button>
              </ButtonView>
            </FormBox>
          );
        })}
      </FormListWrapper>
    </>
  );
}
