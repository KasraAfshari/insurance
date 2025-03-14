import { Route, Routes } from "react-router-dom";

import DashboardPage from "@/pages/Dashboard";
import NewApplicationPage from "@/pages/NewApplication";

import BlogPage from "@/pages/blog";

function App() {
  return (
    <Routes>
      <Route element={<DashboardPage />} path="/" />
      <Route element={<NewApplicationPage />} path="/new_application" />

      <Route element={<BlogPage />} path="/blog" />
    </Routes>
  );
}

export default App;
