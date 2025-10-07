
import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';


import { layoutClasses } from '../core';
import { NavSectionVertical, type NavSectionProps } from '../../components/shared/nav-section';
import { usePathname } from '../../hooks/routes';
import clsx from 'clsx';
import { CONFIG } from '../../global-config';

// ----------------------------------------------------------------------

type NavMobileProps = NavSectionProps & {
  open: boolean;
  onClose: () => void;
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  className,
  checkPermissions,
  ...other
}: NavMobileProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          className: clsx([layoutClasses.nav.root, layoutClasses.nav.vertical, className]),
          sx: [
            {
              overflow: 'unset',
              bgcolor: 'var(--layout-nav-bg)',
              width: 'var(--layout-nav-mobile-width)',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ],
        },
      }}
    >
      {slots?.topArea ?? (
        <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>
          <img src={`${CONFIG.assetsDir}/assets/icons/Logo.png`} />
        </Box>
      )}

      <NavSectionVertical
        data={data}
        checkPermissions={checkPermissions}
        sx={{ px: 2, flex: '1 1 auto' }}
        {...other}
      />

      {slots?.bottomArea}
    </Drawer>
  );
}
