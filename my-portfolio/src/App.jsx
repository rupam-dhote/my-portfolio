import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/scrollAnimation/ScrollToTop.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
const App = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
