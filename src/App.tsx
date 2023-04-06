import React from 'react';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path={'/signup'} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
