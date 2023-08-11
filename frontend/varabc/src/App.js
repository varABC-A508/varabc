import { Routes, Route } from "react-router-dom";

import { Nav } from "./components/common/nav";

import { Home } from './pages/home/Home';
import { Tier } from './pages/Tier';

import { Battle } from "./pages/battle/Battle";
import { BattleMode } from "./pages/battle/BattleMode";
import { BattleRoom } from "./pages/battle/BattleRoom";

import { Friends } from "./pages/myPage/Friends";
import { History } from "./pages/myPage/history/History";
import { Profile } from "./pages/myPage/Profile";
import { Reviews } from "./pages/myPage/Reviews";
import { MyPage } from "./pages/myPage/myPage";

import ProblemForm from "./components/ProblemForm/ProblemForm";
import ProblemPost from "./components/ProblemPost/ProblemPost";

import { Problems } from './pages/problem/Problems';
import ProblemDetail from './pages/problem/ProblemDetail';
import ProblemList from './components/common/list/ProblemList';

import PageModalLogin from './pages/myPage/login/PageModalLogin';

import { BattleResultPage1 } from './pages/battle/BattleResultPage1';
import { BattleResultPage2 } from './pages/battle/BattleResultPage2';


const App = () => {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />}>
          <Route index element={<BattleMode />} />
          <Route path="room" element={<BattleRoom />} />
          <Route path="result1" element={<BattleResultPage1 />} />
          <Route path="result2" element={<BattleResultPage2 />} />
        </Route>
        <Route path="/problem" element={<Problems />}>
          <Route index element={<ProblemList />} />
          <Route path="*" element={<ProblemDetail />} />
        </Route>
        <Route path="/tier" element={<Tier />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="friends" element={<Friends />} />
        </Route>
        <Route path="/admin/create" element={<ProblemForm />} />
        <Route path="/admin/post/:postId" element={<ProblemPost />} />
        <Route path="/admin/edit/:postId" element={<ProblemForm />} />
      </Routes>
    </div>
  );
};

export default App;
