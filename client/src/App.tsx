import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Layout } from "@/components/templates/Layout/Layout";
import { Demo } from "@/pages/Demo/Demo";
import { GithubAdminPage } from "@/pages/Admin/repos/Repos";
import { ProjectsAdminPage } from "./pages/Admin/projects/Projects";
import { TechStackAdminPage } from "./pages/Admin/techstack/Techstack";
import { Guard } from "@/components/utility/guard/Guard";
import { ErrorPage } from "@/pages/Error/Error";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/demo" element={<Demo />} />
          <Route path="/" element={<Navigate to="/admin/github" replace />} />

          <Route path="/admin">
            <Route index element={<Navigate to="github" replace />} />

            <Route
              path="github"
              element={
                <Guard requiredPermission="github:*">
                  <GithubAdminPage />
                </Guard>
              }
            />

            <Route
              path="projects"
              element={
                <Guard requiredPermission="projects:*">
                  <ProjectsAdminPage />
                </Guard>
              }
            />

            <Route
              path="techstack"
              element={
                <Guard requiredPermission="techstack:*">
                  <TechStackAdminPage />
                </Guard>
              }
            />
          </Route>

          <Route path="*" element={<ErrorPage code="404" />} />
        </Routes>
      </Layout>

      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </BrowserRouter>
  );
};

export default App;
