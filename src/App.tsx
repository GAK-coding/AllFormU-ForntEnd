import React from 'react';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          {/*<Route path={'info'} element={<Info />} />*/}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
