import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import loadable from '@loadable/component';

const Home = loadable(() => import('./pages/Home'));
const SignUp = loadable(() => import('./pages/SignUp'));
const SignIn = loadable(() => import('./pages/Login'));
const MakeForm = loadable(() => import('./pages/MakeForm/Main'));
const MakeFormSelect = loadable(() => import('./pages/MakeForm/Select'));
const MakeFormDirect = loadable(() => import('./pages/MakeForm/Direct'));
const MakeFormChatbot = loadable(() => import('./pages/Chatbot/MakeForm'));
const Info = loadable(() => import('./pages/MyPage/Info'));
const Edit = loadable(() => import('./pages/MyPage/Edit'));
const FixedButton = loadable(() => import('./components/FixedButton'));
const ChatbotResForm = loadable(() => import('./pages/Chatbot/Resform'));
const DirectResForm = loadable(() => import('./pages/ResForm/Direct'));
const MakeFormList = loadable(() => import('./pages/MyPage/DetailForm/MakeFormList'));
const ResFormList = loadable(() => import('./pages/MyPage/DetailForm/ResFomList'));
const EditForm = loadable(() => import('./pages/MyPage/EditForm'));
const Statistic = loadable(() => import('./pages/Statistic'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <FixedButton />
          <Routes>
            <Route index element={<Home />} />
            <Route path={'/signup'} element={<SignUp />} />
            <Route path={'/mypage'} element={<Info />} />
            <Route path={'/mypage/edit'} element={<Edit />} />
            <Route path={'/mypage/makeform'} element={<MakeFormList />} />
            <Route path={'/mypage/editform/:id'} element={<EditForm />} />
            <Route path={'/mypage/resform'} element={<ResFormList />} />
            <Route path={'/signin'} element={<SignIn />} />
            <Route path={'/resform/chatbot'} element={<ChatbotResForm />} />
            <Route path={'/directres/:id'} element={<DirectResForm />} />
            <Route path={'/statistic/:id'} element={<Statistic />} />
            <Route path={'/makeform'} element={<MakeForm />} />
            <Route path={'/makeform/select'} element={<MakeFormSelect />} />
            <Route path={'/makeform/direct'} element={<MakeFormDirect />} />
            <Route path={'/makeform/chatbot'} element={<MakeFormChatbot />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
