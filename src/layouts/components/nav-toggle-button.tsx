import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { varAlpha } from '../../utils/style';
// ----------------------------------------------------------------------

export type NavToggleButtonProps = IconButtonProps & {
  isNavMini: boolean;
};

export function NavToggleButton({ isNavMini, sx, ...other }: NavToggleButtonProps) {
  return (
    <IconButton
      size="small"
      sx={[
        (theme) => ({
          p: 1.5,
          width: '20px',
          height: '20px',
          position: 'relative',
          color: 'action.active',
          bgcolor: '#fff',
          transform: 'translate(-50%, -50%)',
          zIndex: 'var(--layout-nav-zIndex)',
          top: 'calc(var(--layout-header-desktop-height) + 75px)',
          left: isNavMini
            ? 'calc(var(--layout-nav-mini-width) - 10px)'
            : 'calc(var(--layout-nav-vertical-width) - 28px)',
          transition: theme.transitions.create(['left'], {
            easing: 'var(--layout-transition-easing)',
            duration: 'var(--layout-transition-duration)',
          }),
          '&:hover': {
            color: 'text.primary',
            bgcolor: 'background.neutral',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isNavMini ? (
        <ArrowForwardIosIcon fontSize="small" />
      ) : (
        <ArrowBackIosNewIcon fontSize="small" />
      )}
    </IconButton>
  );
}
