import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
//pages
import Blog from '../pages/Blog';
import NotFound from '../pages/Page404';
import Home from '../pages/Home';
import Requests from '../pages/Requests';
import AdminDashboardApp from '../pages/AdminDashboardApp';
import CertifyDocument from '../pages/CertifyDocument';
import Companies from '../pages/Companies';
import User from '../pages/Students';
//components
import Logout from '../components/Logout';

// ----------------------------------------------------------------------

export default function AdminRouter() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <AdminDashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'companies', element: <Companies /> },
        { path: 'documents', element: <Blog /> },
        { path: 'requests', element: <Requests /> },
        { path: 'certifyDocument', element: <CertifyDocument /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Home  />},
        { path: 'home', element: <Home /> },
        { path: 'logout', element: <Logout /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
