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
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Documents',
    path: '/dashboard/documents',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Logout',
    path: '/login',
    icon: getIcon('carbon:logout'),
  },
];

export default navConfig;
