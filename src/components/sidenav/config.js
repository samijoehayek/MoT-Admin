import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import TagIcon from '@heroicons/react/24/solid/TagIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import CurrencyDollar from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { SvgIcon } from '@mui/material';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';


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
    title: 'Avatars',
    path: '/dashboard/avatar',
    icon: (
      <SvgIcon fontSize="small">
        <ComputerDesktopIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Collectables',
    path: '/dashboard/collectable',
    icon: (
      <SvgIcon fontSize="small">
        <CurrencyDollarIcon />
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
