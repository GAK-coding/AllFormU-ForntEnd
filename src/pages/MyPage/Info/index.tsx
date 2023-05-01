import { useRecoilValue, useSetRecoilState } from 'recoil';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import Button from '../../../components/ui/Button';
import { color } from '../../../recoil/Color/atom';
import { AlignBox, BtnBox, Form, FormBox, FormWrapper, Line, MyPageWrapper, UserInfo } from './styles';
import { useNavigate, Route, Navigate, Routes } from 'react-router-dom';
import { mypageInfo } from '../../../recoil/User/atom';
import { useEffect } from 'react';
import { makeInfoList } from '../../../typings/makeForm';
import { makeFormInfoList, resFormInfoList } from '../../../recoil/FormList/atom';
import { resInfoList } from '../../../typings/resForm';

export default function Info() {
  const navigate = useNavigate();
  const { blue } = useRecoilValue(color);

  const myInfo = useRecoilValue(mypageInfo);

  const setMakeFormInfoList = useSetRecoilState(makeFormInfoList);
  useEffect(() => {
    const dummyData: makeInfoList[] = [
      {
        id: 1,
        title: 'Make form Title 1',
      },
      {
        id: 2,
        title: 'Make form Title 2',
      },
      {
        id: 3,
        title: 'Make form Title 3',
      },
      // {
      //   id: 4,
      //   title: 'Make form Title 4',
      // },
    ];
    setMakeFormInfoList(dummyData);
  }, []);
  const makeFormInfo = useRecoilValue(makeFormInfoList);

  const setResFormInfoList = useSetRecoilState(resFormInfoList);
  useEffect(() => {
    const dummyData: resInfoList[] = [
      {
        id: 1,
        title: 'Res form Title 1',
      },
      {
        id: 2,
        title: 'Res form Title 2',
      },
      {
        id: 3,
        title: 'Res form Title 3',
      },
      {
        id: 4,
        title: 'Res form Title 4',
      },
    ];
    setResFormInfoList(dummyData);
  }, []);

  const resFormInfo = useRecoilValue(resFormInfoList);

  // redirect
  /* if (id === -1) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/signin" />} />;
      </Routes>
    );
  } */

  return (
    <BaseBgBox>
      <MyPageWrapper>
        <UserInfo>
          <div>My Page</div>
          <img src="images/userProfile.png" alt="userProfile" />
          <div>
            <span> 이름 : {myInfo.name} </span>
            <span> email : {myInfo.email} </span>
          </div>
        </UserInfo>

        <FormWrapper>
          <BtnBox>
            <Button
              onClick={() => navigate('/mypage/edit')}
              color={'black'}
              bgColor={blue}
              fontSize={1.3}
              width={11}
              height={3.5}
            >
              프로필 수정
            </Button>
          </BtnBox>
          <Form>
            <Line onClick={() => navigate('/mypage/makeform')}>내 생성폼</Line>
            <AlignBox>
              {makeFormInfo
                .filter((formInfo) => formInfo.id < 3)
                .map((formInfo, idx) => {
                  return (
                    <FormBox key={idx} onClick={() => navigate('/')}>
                      {formInfo.title}
                    </FormBox>
                  );
                })}
            </AlignBox>
            <AlignBox>
              {makeFormInfo
                .filter((formInfo) => formInfo.id > 2 && formInfo.id < 5)
                .map((formInfo, idx) => {
                  return (
                    <FormBox key={idx} onClick={() => navigate('/')}>
                      {formInfo.title}
                    </FormBox>
                  );
                })}
            </AlignBox>
          </Form>

          <Form>
            <Line onClick={() => navigate('/mypage/resform')}>내 응답</Line>
            <AlignBox>
              {resFormInfo
                .filter((formInfo) => formInfo.id < 3)
                .map((formInfo, idx) => {
                  return (
                    <FormBox key={idx} onClick={() => navigate('/')}>
                      {formInfo.title}
                    </FormBox>
                  );
                })}
            </AlignBox>
            <AlignBox>
              {resFormInfo
                .filter((formInfo) => formInfo.id > 2 && formInfo.id < 5)
                .map((formInfo, idx) => {
                  return (
                    <FormBox key={idx} onClick={() => navigate('/')}>
                      {formInfo.title}
                    </FormBox>
                  );
                })}
            </AlignBox>
          </Form>
        </FormWrapper>
      </MyPageWrapper>
    </BaseBgBox>
  );
}
