import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <Link to="/experiments/mac-doc">
        mac doc
      </Link>
      <br />
      <Link to="/experiments/profile-popup">
        profile pop up
      </Link>
      <br />
      <Link to="/experiments/blackcard-stack">
        black card stack
      </Link>
      <br />
      <Link to="/experiments/voice-chat-expand">
        voice chat expand
      </Link>
      <br />
      <Link to="/experiments/search-box">
        search box
      </Link>
      <br />
      <Link to="/experiments/calender">
        calender
      </Link>
      <br />
      <Link to="/experiments/love-toggle">
        love toggle
      </Link>
    </main>
  );
}