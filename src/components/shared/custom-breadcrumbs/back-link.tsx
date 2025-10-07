import type { LinkProps } from '@mui/material/Link';

import Link from '@mui/material/Link';


import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { RouterLink } from '../routes';

// ----------------------------------------------------------------------

export type BackLinkProps = LinkProps & {
  label?: string;
};

export function BackLink({ sx, label, ...other }: BackLinkProps) {
  return (
    <Link
      component={RouterLink}
      color="inherit"
      underline="none"
      sx={[
        (theme) => ({
          verticalAlign: 'middle',
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            transform: 'translateY(-2px)',
            marginLeft: {
              xs: '-14px',
              md: '-18px',
            },
            transition: theme.transitions.create('opacity', {
              duration: theme.transitions.duration.shorter,
              easing: theme.transitions.easing.sharp,
            }),
          },
          '&:hover .MuiSvgIcon-root': {
            opacity: 0.48,
          },

        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
      {label}
    </Link>
  );
}
