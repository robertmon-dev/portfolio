import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NavigationListener } from "./components/utility/navigation/Listener";
import { Layout } from "@/components/templates/Layout/Layout";
import { Demo } from "@/pages/Demo/Demo";
import { AboutPage } from "@/pages/About/About";
import { GithubAdminPage } from "@/pages/Admin/repos/Repos";
import { ProjectsAdminPage } from "./pages/Admin/projects/Projects";
import { TechStackAdminPage } from "./pages/Admin/techstack/Techstack";
import { UsersAdminPage } from "./pages/Admin/users/Users";
import { ExperienceAdminPage } from "./pages/Admin/experience/Experience";
import { Guard } from "@/components/utility/guard/Guard";
import { ErrorPage } from "@/pages/Error/Error";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationListener />
      <Layout>
        <Routes>
          <Route index element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/error/:code" element={<ErrorPage />} />

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

            <Route
              path="experience"
              element={
                <Guard requiredPermission="experience:*">
                  <ExperienceAdminPage />
                </Guard>
              }
            />

            <Route
              path="users"
              element={
                <Guard requiredPermission="users:*">
                  <UsersAdminPage />
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
