import type { IconButtonProps } from '@mui/material/IconButton';


import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { CONFIG } from '../../global-config';


// ----------------------------------------------------------------------

export type AccountButtonProps = IconButtonProps & {
  photoURL: string;
  displayName: string;
};

export function AccountButton({ photoURL, displayName, sx, ...other }: AccountButtonProps) {
  return (
    <IconButton

      aria-label="Account button"
      sx={[{ p: 0, width: "40px", height: '40px', backgroundColor: "#fff" }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >

      <img src={`${CONFIG.assetsDir}/assets/icons/home/ic_user.svg`} width={"22px"} />

    </IconButton>
  );
}
