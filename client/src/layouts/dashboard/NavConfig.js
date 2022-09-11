import { useState, useEffect } from 'react';
// component
import Iconify from '../../components/Iconify';

import RequestService from '../../components/requests/request.service';

import { Badge } from '@mui/material';

// ----------------------------------------------------------------------

export function GetUnCertifiedRequestsCount(){
      const [notifications, setNotifications] = useState([]);

      var unCertifiedRequests = [];

      useEffect(()=>{
          retrieveRequests();
      });

      const retrieveRequests = () => {
        RequestService.getAll()
        .then(response => {
          setNotifications(response.data)
        });
      }

      notifications.map(notification => {
        if(notification.status == 0){
          unCertifiedRequests.push(notification)
        }
      })

    return(
      <Badge badgeContent={unCertifiedRequests.length} color="error"></Badge>
    );
}

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const getAdminRequestCount = (name) => <><Iconify icon={name} width={22} height={22} /><GetUnCertifiedRequestsCount/></>;


const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'students',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Companies',
    path: '/dashboard/companies',
    icon: getIcon('clarity:building-solid'),
  },
  {
    title: 'Documents',
    path: '/dashboard/documents',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Requests',
    path: '/dashboard/requests',
    icon: getAdminRequestCount('icon-park-outline:incoming'),
  },
  {
    title: 'Logout',
    path: '/login',
    icon: getIcon('ri:logout-circle-r-fill'),
  },
];

const companyNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Records',
    path: '#',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Logout',
    path: '/login',
    icon: getIcon('ri:logout-circle-r-fill'),
  },
]

const studentNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'My Documents',
    path: '/dashboard/documents',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'My Requests',
    path: '/dashboard/requests',
    icon: getIcon('icon-park-outline:incoming'),
  },
  {
    title: 'Logout',
    path: '/login',
    icon: getIcon('ri:logout-circle-r-fill'),
  },
]

const NavService = {
  navConfig,
  companyNavConfig,
  studentNavConfig
}

export default NavService;
