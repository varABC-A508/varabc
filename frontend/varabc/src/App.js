import {Routes, Route} from 'react-router-dom';

import { Nav } from './components/common/nav';

import { Home } from './pages/Home';
import { Problems } from './pages/Problems';
import { Tier } from './pages/Tier';

import { Battle } from './pages/battle/Battle';
import { BattleMode } from './pages/battle/BattleMode';
import { BattleRoom } from './pages/battle/BattleRoom';

import { Friends } from './pages/myPage/Friends';
import { History } from './pages/myPage/History';
import { Profile } from './pages/myPage/Profile';
import { Reviews } from './pages/myPage/Reviews';
import { MyPage } from './pages/myPage/myPage';


import ButtonMoveTest from './ButtonMoveTest';
import SubmissionList from './components/SubmissionList/SubmissionList'

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />}>
          <Route index element={<BattleMode />} />
          <Route path="room" element={<BattleRoom />} />
        </Route>
        <Route path="/problems" element={<Problems />} />
        <Route path="/tier" element={<Tier />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="friends" element={<Friends />} />
        </Route>
      </Routes>

      <SubmissionList />
      <ButtonMoveTest />
    </div>
  );
}

export default App;
