import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bgLight dark:bg-bgDark">
        <h1>public layout</h1>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
