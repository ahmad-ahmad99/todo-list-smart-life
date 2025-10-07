import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';

import type { AccountDrawerProps } from './components/account-drawer';

// ----------------------------------------------------------------------

export const _account: AccountDrawerProps['data'] = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Profile', href: '#', icon: <PersonIcon /> },
  { label: 'Projects', href: '#', icon: <AssignmentIcon />, info: '3' },
  { label: 'Subscription', href: '#', icon: <ReceiptLongIcon /> },
  { label: 'Security', href: '#', icon: <SecurityIcon /> },
  { label: 'Account settings', href: '#', icon: <SettingsIcon /> },
];