import type { Breakpoint } from '@mui/material/styles';


import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


import { layoutClasses } from '../core';
import { NavToggleButton } from '../components/nav-toggle-button';
import { NavSectionMini, NavSectionVertical, type NavSectionProps } from '../../components/shared/nav-section';
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
        <Box sx={{ pl: 2.5, pr: 2, pt: 2.5, pb: 2, backgroundColor: "#F8F8F8", border: '1px solid #E5E7EB', borderRadius: 3 }} display={'flex'} justifyContent={"center"} alignItems={'center'} flexDirection={'column'}>
          <img src={`${CONFIG.assetsDir}/assets/icons/Logo.png`} width={'150px'} />
          <Typography sx={{ color: '#62748E', fontSize: "16px" }} pt={1}>
            اسم الشركة سمارت لايف
          </Typography>

        </Box>
      )}

      <NavSectionVertical
        data={data}
        cssVars={cssVars}
        checkPermissions={checkPermissions}
        sx={{ flex: '1 1 auto' }}
      />
    </>
  );

  const renderNavMini = () => (
    <>
      {slots?.topArea ?? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2.5 }}>
        </Box>
      )}

      <NavSectionMini
        data={data}
        cssVars={cssVars}
        checkPermissions={checkPermissions}
        sx={[
          (theme) => ({
            pb: 2,
            px: 0.5,
            flex: '1 1 auto',
            overflowY: 'auto',
          }),
        ]}
      />

      {slots?.bottomArea}
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

      <NavToggleButton
        isNavMini={isNavMini}
        onClick={onToggleNav}
        sx={[
          (theme) => ({
            display: 'none',
            [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
          }),
        ]}
      />
      {isNavMini ? renderNavMini() : renderNavVertical()}
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
