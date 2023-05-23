import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import Button from '../../../components/ui/Button';
import { color } from '../../../recoil/Color/atom';
import { AlignBox, Form, FormBox, FormWrapper, Line, MyPageWrapper, UserInfo } from './styles';
import { useNavigate, Route, Navigate, Routes } from 'react-router-dom';
import { googleUserInfo, isLogin, userInfo } from '../../../recoil/User/atom';
import { useCallback, useEffect, useState } from 'react';
import { resFormInfoList } from '../../../recoil/FormList/atom';
import { resInfoList } from '../../../typings/resForm';
import { FiPlus } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { getMakeForms } from '../../../api/getFormInfo';
import { GetForm } from '../../../typings/getForm';
import PasswordMordal from '../../../components/CheckMordal/PasswordMordal';
import { useMessage } from '../../../hooks/useMessage';

export default function Info() {
  const navigate = useNavigate();
  const { blue } = useRecoilValue(color);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showMessage, contextHolder } = useMessage();
  const [login, setLogin] = useRecoilState(isLogin);

  const myInfo = useRecoilValue(userInfo);
  const googleInfo = useRecoilValue(googleUserInfo);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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

  const { data: makeFormInfo, isLoading, error, isError } = useQuery<GetForm[]>('myMakeForm', getMakeForms);

  // console.log('이거', makeFormInfo);

  // redirect
  if (!login) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/signin" />} />;
      </Routes>
    );
  }

  return (
    <BaseBgBox>
      {contextHolder}
      <MyPageWrapper>
        <UserInfo>
          <div>
            <div>My Page</div>
            <img src="/images/userProfile.png" alt="userProfile" />
            <div>
              <span>{myInfo.nickname} </span>
              <Button onClick={showModal} color={'black'} bgColor={blue} fontSize={1.3} width={13} height={3.5}>
                프로필 수정하기
              </Button>
              <PasswordMordal open={isModalOpen} onCancel={handleCancel} />
            </div>
          </div>
        </UserInfo>

        <FormWrapper>
          <Form>
            <span onClick={() => navigate('/mypage/makeform')}>
              <FiPlus />
            </span>
            <Line>
              <span>내 생성폼</span>
            </Line>
            <AlignBox>
              {/* TODO : 4개만 보여주기 */}
              {makeFormInfo?.map((formInfo: GetForm) => {
                return <FormBox key={formInfo.id}>{formInfo.title}</FormBox>;
              })}
            </AlignBox>
            <AlignBox>
              {makeFormInfo?.map((formInfo: GetForm) => {
                return <FormBox key={formInfo.id}>{formInfo.title}</FormBox>;
              })}
            </AlignBox>
          </Form>

          <Form>
            <span onClick={() => navigate('/mypage/resform')}>
              <FiPlus />
            </span>
            <Line>내 응답</Line>
            <AlignBox>
              {resFormInfo
                .filter((formInfo) => formInfo.id < 3)
                .map((formInfo, idx) => {
                  return (
                    <FormBox key={idx} onClick={() => true}>
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
                    <FormBox key={idx} onClick={() => true}>
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
