import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IntroducePage from "../pages/introducePage";
// import ProtectedRoute from "./ProtectedRoute";
import Signup from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPages";
import MainLayout from "../pages/MainLayout";
import Dashboard from "../pages/Dashboard";

const routes = createBrowserRouter([
  { path: "/", element: <IntroducePage /> },
  {
    path: "/app",
    element: (
      // <ProtectedRoute>
      <MainLayout />
      // </ProtectedRoute>
    ),
    children: [{ path: "dashboard", element: <Dashboard /> }],
  },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <LoginPage /> },
]);

const ClientRoute = () => <RouterProvider router={routes} />;

export default ClientRoute;
