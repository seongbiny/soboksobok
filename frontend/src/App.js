import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WelfareDetail from './pages/WelfareDetail';
import Main from './pages/Main.jsx';
import Auth from './pages/OAuth.jsx';
import Qna from './pages/Qna.jsx';
import QnaCreate from './pages/QnaCreate.jsx';
import QnaPatch from './pages/QnaPatch.jsx';
import QnaDetail from './pages/QnaDetail.jsx';
import WelfareSearch from './pages/WelfareSearch';
import WelfareRecommend from './pages/WelfareRecommend';
import CustomFilter from './pages/CustomFilter';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Layout from './components/layout/layout';
import './CSS/app.css';
import Manual from './pages/Manual';

function App() {
  return (
    <div id="wrapper">
      <Layout>
        <Routes>
          <Route path="/oauth/kakao/callback" element={<Auth />} />
          <Route path="/" element={<Main />} />
          <Route path="/welfare/:welfareId" element={<WelfareDetail />} />
          <Route path="/Qna" element={<Qna />} />
          <Route path="/search" element={<WelfareSearch />} />
          <Route path="/QnaCreate/" element={<QnaCreate />} />
          <Route path="/QnaPatch/:qnaId" element={<QnaPatch />} />
          <Route path="/QnaDetail/:qnaId" element={<QnaDetail />} />
          <Route path="/filter" element={<CustomFilter />} />
          <Route path="/recommend" element={<WelfareRecommend />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
