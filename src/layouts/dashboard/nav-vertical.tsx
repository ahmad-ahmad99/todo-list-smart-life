import type { Breakpoint } from '@mui/material/styles';


import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


import { layoutClasses } from '../core';
import { NavToggleButton } from '../components/nav-toggle-button';
import { NavSectionVertical, type NavSectionProps } from '../../components/shared/nav-section';
import clsx from 'clsx';
import { CONFIG } from '../../global-config';
import { useAuthContext } from '../../hooks/auth/jwt';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export type NavVerticalProps = React.ComponentProps<'div'> &
  NavSectionProps & {
    isNavMini: boolean;
    layoutQuery?: Breakpoint;
    onToggleNav: () => void;
    slots?: {
      topArea?: React.ReactNode;
      bottomArea?: React.ReactNode;
    };
  };

export function NavVertical({
  sx,
  data,
  slots,
  cssVars,
  className,
  isNavMini,
  onToggleNav,
  checkPermissions,
  layoutQuery = 'md',
  ...other
}: NavVerticalProps) {
  const { user } = useAuthContext()
  const renderNavVertical = () => (
    <>
      {slots?.topArea ?? (
        <Box sx={{ pl: 2.5, pr: 2, pt: 2.5, pb: 1 }} display={'flex'} justifyContent={"space-between"} alignItems={'center'}>
          <div>
            <img src={user?.image} width={"40px"} />
            <Typography component={"span"} mx={1}>{user?.username}</Typography>

          </div>
          <img src={`${CONFIG.assetsDir}/assets/icons/home/chart.svg`} width={"40px"} />

        </Box>
      )}

      <NavSectionVertical
        data={data}
        cssVars={cssVars}
        checkPermissions={checkPermissions}
        sx={{ px: 2, flex: '1 1 auto' }}
      />
    </>
  );


  return (
    <NavRoot
      isNavMini={isNavMini}
      layoutQuery={layoutQuery}
      className={clsx([layoutClasses.nav.root, layoutClasses.nav.vertical, className])}
      sx={sx}
      {...other}
    >

      {renderNavVertical()}
    </NavRoot>
  );
}

// ----------------------------------------------------------------------

const NavRoot = styled('div', {
  shouldForwardProp: (prop: string) => !['isNavMini', 'layoutQuery', 'sx'].includes(prop),
})<Pick<NavVerticalProps, 'isNavMini' | 'layoutQuery'>>(
  ({ isNavMini, layoutQuery = 'md', theme }) => ({
    top: 0,
    left: 0,
    height: '100%',
    display: 'none',
    minHeight: '40vw',
    // position: 'fixed',
    flexDirection: 'column',
    zIndex: 'var(--layout-nav-zIndex)',
    backgroundColor: 'var(--layout-nav-bg)',
    width: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
    borderRadius: 18,
    transition: theme.transitions.create(['width'], {
      easing: 'var(--layout-transition-easing)',
      duration: 'var(--layout-transition-duration)',
    }),
    [theme.breakpoints.up(layoutQuery)]: { display: 'flex' },
  })
);
