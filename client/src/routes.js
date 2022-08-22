import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User';
import Login from './pages/Login';
import Home from  './pages/Home';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Companies from './pages/Companies';
import Requests from './pages/Requests';
import DashboardApp from './pages/DashboardApp';
import StudentRequest from './pages/StudentRequest';
import StudentIndex from './pages/StudentIndex';
import CertifyDocument from './pages/CertifyDocument';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'companies', element: <Companies /> },
        // { path: 'documents', element: <Blog /> },
        { path: 'requests', element: <Requests /> },
        { path: 'studentRequest', element: <StudentRequest /> },
        { path: 'studentIndex', element: <StudentIndex /> },
        { path: 'certifyDocument', element: <CertifyDocument/> },
       
        

      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/home" /> },
        { path: 'home', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
       
        
      
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
