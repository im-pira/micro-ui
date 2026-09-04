import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePopUp from "./experiments/profile-pop/ProfilePopUp";
import BlackCardStack from "./experiments/black-card-stack/BlackCardStack";
import MacDoc from "./experiments/mac-doc/MacDoc";
import VoiceChatExpand from "./experiments/voice-chat-expand/VoiceChatExpand";
import SearchBox from "./experiments/search-box/SearchBox";
import Calender from "./experiments/calender/Calender";
import LoveToggle from "./experiments/love-toggle/LoveToggle";
import MusicPlayer from "./experiments/music-player/MusicPlayer";
import Knob from "./experiments/knob/Knob";
import WalletHolder from "./experiments/wallet-holder/WalletHolder";
import GlassFolder from "./experiments/glass-folder/GlassFolder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/experiments/mac-doc"
          element={<MacDoc />}
        />
        <Route
          path="/experiments/profile-popup"
          element={<ProfilePopUp />}
        />
        <Route
          path="/experiments/blackcard-stack"
          element={<BlackCardStack />}
        />
        <Route
          path="/experiments/voice-chat-expand"
          element={<VoiceChatExpand />}
        />
        <Route
          path="/experiments/search-box"
          element={<SearchBox />}
        />
        <Route
          path="/experiments/calender"
          element={<Calender />}
        />
        <Route
          path="/experiments/love-toggle"
          element={<LoveToggle />}
        />
        <Route
          path="/experiments/music-player"
          element={<MusicPlayer />}
        />
        <Route
          path="/experiments/knob"
          element={<Knob />}
        />
        <Route
          path="/experiments/wallet-holder"
          element={<WalletHolder />}
        />
        <Route
          path="/experiments/glass-folder"
          element={<GlassFolder />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;