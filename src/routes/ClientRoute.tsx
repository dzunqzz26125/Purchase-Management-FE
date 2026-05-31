import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import IntroducePage from "../pages/introducePage";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPages";
import MainLayout from "../pages/MainLayout";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/InventoryPage";
import InboundPage from "../pages/PO-Page";
import OutboundPage from "../pages/SO-Page";
import ReportPage from "../pages/ReportPage";
import ProvidersPage from "../pages/ProvidersPage";
import AgencyPage from "../pages/AgencyPage";

const routes = createBrowserRouter([
  { path: "/", element: <IntroducePage /> },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "inventory", element: <Inventory /> },
      { path: "po", element: <InboundPage /> },
      { path: "so", element: <OutboundPage /> },
      { path: "providers", element: <ProvidersPage /> },
      { path: "agency", element: <AgencyPage /> },
      { path: "report", element: <ReportPage /> },
    ],
  },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <LoginPage /> },
]);

const ClientRoute = () => <RouterProvider router={routes} />;

export default ClientRoute;
