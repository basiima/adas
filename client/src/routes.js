import React from 'react';
import AuthService from './services/auth.service';
import GeneralRouter from './routes/GeneralRoutes';
import AdminRouter from './routes/AdminRoutes';
import StudentRouter from './routes/StudentRoutes';
import CompanyRouter from './routes/CompanyRoutes';

const loggedInUser = AuthService.getCurrentUser();
const loggedInUserRole = loggedInUser.roles;

export default function Router() {
//console.log(loggedInUserRole);
  return (
    <>
      {loggedInUserRole == 'ROLE_ISSUER' && <AdminRouter /> }
      {loggedInUserRole == 'ROLE_STUDENT' && <StudentRouter /> }
      {loggedInUserRole == 'ROLE_COMPANY' && <CompanyRouter /> }
      {loggedInUserRole == null && <GeneralRouter /> }
    </>
  );
}
