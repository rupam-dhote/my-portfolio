import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/scrollAnimation/ScrollToTop.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import Preloader from "./components/Preloader.jsx";
import { useImagePreloader } from "./hook/useImagePreloader.js";
import { BrowserRouter, Route, Routes } from "react-router";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const { isLoading, progress } = useImagePreloader();

  return (
    <div className="min-h-screen overflow-x-hidden ">
      <BrowserRouter>
        <ScrollToTop />
        {isLoading ? (
          <AnimatePresence mode="wait">
            <Preloader progress={progress} />
          </AnimatePresence>
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="projects" element={<ProjectPage />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
