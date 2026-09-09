import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage.tsx";
import { PreTestPage } from "./pages/PreTestPage.tsx";
import { LobbyPage } from "./pages/LobbyPage.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pretest" element={<PreTestPage />} />
      <Route path="/lobby" element={<LobbyPage />} />
    </Routes>
  );
}
