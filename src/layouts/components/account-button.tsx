import type { IconButtonProps } from '@mui/material/IconButton';


import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { CONFIG } from '../../global-config';
import { useAuthContext } from '../../hooks/auth/jwt';


// ----------------------------------------------------------------------

export type AccountButtonProps = IconButtonProps & {
  photoURL: string;
  displayName: string;
};

export function AccountButton({ photoURL, displayName, sx, ...other }: AccountButtonProps) {
  const { user } = useAuthContext();

  return (
    <IconButton

      aria-label="Account button"
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >


      <Avatar alt={user?.username ?? ''} sx={{ backgroundColor: 'transparent', color: "#fff" }}>
        {user?.username && user?.username?.charAt(0).toUpperCase()}
      </Avatar>

    </IconButton>
  );
}
