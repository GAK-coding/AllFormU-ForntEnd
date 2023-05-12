import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MakeForm from './pages/MakeForm/Main';
import MakeFormSelect from './pages/MakeForm/Select';
import MakeFormDirect from './pages/MakeForm/Direct';
import MakeFormChatbot from './pages/MakeForm/Chatbot';
import Info from './pages/MyPage/Info';
import Edit from './pages/MyPage/Edit';
import FindPassword from './pages/FindPassword';
import FixedButton from './components/FixedButton';
import ChatbotResForm from './pages/ResForm/ChatbotResForm';
import DirectResForm from './pages/ResForm/DirectResForm';
import { ReactQueryDevtools } from 'react-query/devtools';
import MakeFormList from './pages/MyPage/DetailForm/MakeFormList';
import ResFormList from './pages/MyPage/DetailForm/ResFomList';
import EditForm from './pages/MyPage/EditForm';

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
            <Route path={'/signin/findpassword'} element={<FindPassword />} />
            <Route path={'/resform/chatbot'} element={<ChatbotResForm />} />
            <Route path={'/resform/direct/:id'} element={<DirectResForm />} />
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
