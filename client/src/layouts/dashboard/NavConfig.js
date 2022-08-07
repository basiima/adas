// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

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
    icon: getIcon('icon-park-outline:incoming'),
  },
  {
    title: 'Logout',
    path: '/login',
    icon: getIcon('ri:logout-circle-r-fill'),
  },
];

export default navConfig;
