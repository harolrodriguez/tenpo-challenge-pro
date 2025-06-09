import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary p-4">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
