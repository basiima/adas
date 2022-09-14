import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import Login from '../pages/Login';
import NotFound from '../pages/Page404';
import Home from '../pages/Home';
import VerificationSuccess from '../pages/VerificationSuccess';

// ----------------------------------------------------------------------

export default function GeneralRouter() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Home  />},
        { path: 'home', element: <Home /> },
        { path: 'verification-success', element: <VerificationSuccess />},
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
