import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
//
import Blog from '../pages/Blog';
import NotFound from '../pages/Page404';
import Home from '../pages/Home';
import Requests from '../pages/Requests';
import DashboardApp from '../pages/DashboardApp';
import AddRequest from '../components/requests/AddRequest';
import Logout from '../components/Logout';

// ----------------------------------------------------------------------

export default function StudentRouter() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'documents', element: <Blog /> },
        { path: 'requests', element: <Requests /> },
        { path: 'place-request', element: <AddRequest/> }
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
