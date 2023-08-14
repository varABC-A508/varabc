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

import ProblemForm from "./pages/ProblemForm/ProblemForm";
import ProblemPost from "./pages/ProblemPost/ProblemPost";
import AdminPage from "./pages/ProblemPost/AdminPage";
import AdminProblemList from "./pages/ProblemPost/AdminProblemList";

import { Problems } from './pages/problem/Problems';
import ProblemDetail from './pages/problem/ProblemDetail';
import ProblemList from './components/common/list/ProblemList';

import { BattleResultPage1 } from './pages/battle/BattleResultPage1';
import { BattleResultPage2 } from './pages/battle/BattleResultPage2';
import IdeContainer from './components/ide/IdeContainer';

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Routes>
        {"battle/45/game/w5fuZzsQK9y9A-JoN6iNTA/203334841"}
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />}>
          <Route index element={<BattleMode />} />
          <Route path="join/:roomToken" element={<BattleRoom />} />
          <Route path="result1" element={<BattleResultPage1 />} />
          <Route path="result2" element={<BattleResultPage2 />} />
          <Route path=":problemNo/game/:roomToken/:TeamNo" element={<IdeContainer />} />
        </Route>
        <Route path="/problem" element={<Problems />}>
          <Route index element={<ProblemList />} />
          <Route path=":problemNo" element={<ProblemDetail />} />
        </Route>
        <Route path="/tier" element={<Tier />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="friends" element={<Friends />} />
        </Route>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminProblemList />} />
          <Route path="post" element={<AdminProblemList />} />
          <Route path="post/:postId" element={<ProblemPost />} />
          <Route path="post/:postId/edit" element={<ProblemForm />} />
          <Route path="create" element={<ProblemForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
