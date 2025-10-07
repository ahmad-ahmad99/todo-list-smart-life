import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';


import Box from '@mui/material/Box';
import { CONFIG } from '../../global-config';
import Typography from '@mui/material/Typography';


// ----------------------------------------------------------------------

export type AuthSplitSectionProps = BoxProps & {
  method?: string;
  imgUrl?: string;
  layoutQuery?: Breakpoint;
  methods?: {
    path: string;
    icon: string;
    label: string;
  }[];
};

export function AuthSplitSection({
  sx,
  method,
  methods,
  layoutQuery = 'md',
  imgUrl = `${CONFIG.assetsDir}/assets/login/img-web1.png`,
  ...other
}: AuthSplitSectionProps) {

  return (
    <Box
      sx={[
        (theme) => ({
          backgroundColor: "#fff",

          width: "50%",
          display: 'none',
          position: 'relative',
          [theme.breakpoints.up(layoutQuery)]: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >


      <Box
        component="img"
        alt="Dashboard illustration"
        src={imgUrl}

        sx={{ objectFit: 'contain' }}
      />
    </Box>
  );
}
