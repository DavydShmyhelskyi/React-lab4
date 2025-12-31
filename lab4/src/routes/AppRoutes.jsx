import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import TodoContainer from "../components/TodoContainer";
import Lab4 from "../components/Lab4";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo-list" element={<TodoContainer />} />
      {/* <Route path="/lab4" element={<Lab4 />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
