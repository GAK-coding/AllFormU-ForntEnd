import { useRecoilValue } from 'recoil';
import Button from '../../../components/ui/Button';
import { ButtonWrapper, FormBox, FormListWrapper, HeaderWrapper, Title } from '../styles';
import { color } from '../../../recoil/Color/atom';

export default function MakeFormList() {
  const { blue, lightPurple } = useRecoilValue(color);
  return (
    <>
      <HeaderWrapper>
        <span>내 생성폼</span>
      </HeaderWrapper>

      <FormListWrapper>
        <FormBox>
          <Title>
            <div>
              2023 차세대 챗봇 1학기 중간고사
              <span>2023 차세대 챗봇 1학기 중간고사입니당당당당당당~</span>
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
      </FormListWrapper>
    </>
  );
}
