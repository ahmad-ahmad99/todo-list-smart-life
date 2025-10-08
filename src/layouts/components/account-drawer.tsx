import type { IconButtonProps } from '@mui/material/IconButton';


import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';


import CloseIcon from '@mui/icons-material/Close';

import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';
import { useAuthContext } from '../../hooks/auth/jwt';
import { usePathname } from '../../hooks/routes';
import { RouterLink } from '../../components/shared/routes';
import { paths } from '../../routes/paths';
import { useState } from 'react';

// ----------------------------------------------------------------------

export type AccountDrawerProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountDrawer({ data = [], sx, ...other }: AccountDrawerProps) {
  const pathname = usePathname();

  // const { user } = useMockedUser();
  const { user } = useAuthContext();

  const [open, setOpen] = useState<boolean>(false)

  const renderAvatar = () => (

    <Avatar src={user?.image ?? ''} alt={user?.username ?? ''} sx={{ width: '96px', height: '96px' }}>
      {user?.username && user?.username?.charAt(0).toUpperCase()}
    </Avatar>
  );

  const renderList = () => (
    <MenuList
      disablePadding
      sx={[
        (theme) => ({
          py: 3,
          px: 2.5,
          borderTop: `dashed 1px ${theme.vars?.palette.divider}`,
          borderBottom: `dashed 1px ${theme.vars?.palette.divider}`,
          '& li': { p: 0 },
        }),
      ]}
    >
      {data.map((option) => {
        const rootLabel = pathname.includes('/dashboard') ? 'Home' : 'Dashboard';
        const rootHref = pathname.includes('/dashboard') ? '/' : paths.dashboard.root;

        return (
          <MenuItem key={option.label}>
            <Link
              component={RouterLink}
              href={option.label === 'Home' ? rootHref : option.href}
              color="inherit"
              underline="none"
              onClick={() => setOpen(false)}
              sx={{
                p: 1,
                width: 1,
                display: 'flex',
                typography: 'body2',
                alignItems: 'center',
                color: 'text.secondary',
                '& svg': { width: 24, height: 24 },
                '&:hover': { color: 'text.primary' },
              }}
            >
              {option.icon}

              <Box component="span" sx={{ ml: 2 }}>
                {option.label === 'Home' ? rootLabel : option.label}
              </Box>

              {option.info && (
                <Typography color="error" sx={{ ml: 1 }}>
                  {option.info}
                </Typography>
              )}
            </Link>
          </MenuItem>
        );
      })}
    </MenuList>
  );

  return (
    <>
      <AccountButton
        onClick={() => setOpen(true)}
        photoURL={user?.image ?? ''}
        displayName={user?.username ?? ''}
        sx={sx}
        {...other}
      />

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
          paper: { sx: { width: 320, backgroundColor: "#fff" } },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            top: 12,
            left: 12,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            pt: 8,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {renderAvatar()}

          <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
            {user?.username}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }} noWrap>
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
        </Box>

        {renderList()}

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={() => setOpen(false)} />
        </Box>
      </Drawer>
    </>
  );
}
