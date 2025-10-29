import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Inbox } from "./pages/Inbox";
import { Profile } from "./pages/Profile";
import { Topics } from "./pages/Topics";
import { Tutors } from "./pages/Tutors";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/inbox" element={<Inbox />} />
    <Route path="/topics" element={<Topics />} />
    <Route path="/tutors" element={<Tutors />} />

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

