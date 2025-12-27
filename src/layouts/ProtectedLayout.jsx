import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="min-h-screen bg-bgLight dark:bg-bgDark">
      {/* Navbar will come here */}
      <main className="pt-16 px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
