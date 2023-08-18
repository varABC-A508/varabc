import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/common/nav';
import { Home } from './pages/home/Home';
import { Tier } from './pages/Tier';
import { Battle } from './pages/battle/Battle';
import { BattleMode } from './pages/battle/BattleMode';
import { BattleRoom } from './pages/battle/BattleRoom';
import { Friends } from './pages/myPage/Friends';
import { HistoryBase } from './pages/myPage/history/HistoryBase';
import { History } from './pages/myPage/history/History';
import { BattleDetail } from './pages/myPage/history/battle/BattleDetail/BattleDetail';
import { MyCode } from './pages/myPage/history/code/MyCode';
import { Profile } from './pages/myPage/Profile';
import { Reviews } from './pages/myPage/Reviews';
import { MyPage } from './pages/myPage/myPage';
// import ProblemForm from './pages/ProblemForm/ProblemForm';
// import ProblemPost from './pages/ProblemPost/ProblemPost';
// import AdminPage from './pages/ProblemPost/AdminPage';
// import AdminProblemList from './pages/ProblemPost/AdminProblemList';
import { Problems } from './pages/problem/Problems';
import ProblemDetail from './pages/problem/ProblemDetail';
import ProblemList from './components/common/list/ProblemList';
import { BattleResultPage1 } from './pages/battle/BattleResultPage1';
import { BattleResultPage2 } from './pages/battle/BattleResultPage2';
import IdeContainer from './components/ide/IdeContainer';
import { TeamReview } from './pages/battle/TeamReview';

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />}>
          <Route index element={<BattleMode />} />
          <Route path="join/:roomToken" element={<BattleRoom />} />
          <Route path=":roomToken/result1" element={<BattleResultPage1 />} />
          <Route path=":roomToken/result2" element={<BattleResultPage2 />} />
          <Route path=":roomToken/:teamToken/review" element={<TeamReview />} />
          <Route path=":problemNo/game/:roomToken/:teamToken" element={<IdeContainer />} />
        </Route>
        <Route path="/problem" element={<Problems />}>
          <Route index element={<ProblemList />} />
          <Route path=":problemNo" element={<ProblemDetail />} />
        </Route>
        <Route path="/tier" element={<Tier />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<HistoryBase />}>
            <Route index element={<History />} />
            <Route path="battle" element={<History />} />
            <Route path="practice" element={<History />} />
            <Route
              path="battle/detail/:competitionResultNo"
              element={<BattleDetail />}
            />
            <Route
              path="battle/code/:submitNo"
              element={<MyCode mode="battle" />}
            />
            <Route
              path="practice/code/:submitNo"
              element={<MyCode mode="practice" />}
            />
          </Route>
          <Route path="reviews" element={<Reviews />} />
          <Route path="friends" element={<Friends />} />
        </Route>
        {/* <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminProblemList />} />
          <Route path="post" element={<AdminProblemList />} />
          <Route path="post/:postId" element={<ProblemPost />} />
          <Route path="post/:postId/edit" element={<ProblemForm />} />
          <Route path="create" element={<ProblemForm />} />
        </Route> */}
      </Routes>
    </div>
  );
};

export default App;
