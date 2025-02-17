import CreateGame from "@/pages/CreateGame";
import JoinGame from "@/pages/JoinGame";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import Profile from "@/pages/Profile";

const RoutesList = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreateGame />} />
        <Route path="join" element={<JoinGame />} />
        <Route path="join/:gameId" element={<JoinGame />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default RoutesList;
