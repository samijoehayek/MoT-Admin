import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import TagIcon from '@heroicons/react/24/solid/TagIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Overview',
    path: '/dashboard',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Items',
    path: '/dashboard/items',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Roles',
    path: '/dashboard/roles',
    icon: (
      <SvgIcon fontSize="small">
        <TagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/dashboard/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
//   {
//     title: 'Login',
//     path: '/auth/login',
//     icon: (
//       <SvgIcon fontSize="small">
//         <LockClosedIcon />
//       </SvgIcon>
//     )
//   },
//   {
//     title: 'Register',
//     path: '/auth/register',
//     icon: (
//       <SvgIcon fontSize="small">
//         <UserPlusIcon />
//       </SvgIcon>
//     )
//   },
//   {
//     title: 'Error',
//     path: '/404',
//     icon: (
//       <SvgIcon fontSize="small">
//         <XCircleIcon />
//       </SvgIcon>
//     )
//   }
];
