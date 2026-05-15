import { Outlet } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
import Topbar from "../components/layouts/Header";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen">
        <Topbar />
        <div className="p-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
