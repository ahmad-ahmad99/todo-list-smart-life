import type { AppBarProps } from '@mui/material/AppBar';
import type { ContainerProps } from '@mui/material/Container';
import type { Theme, SxProps, CSSObject, Breakpoint } from '@mui/material/styles';


import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

import { layoutClasses } from './classes';
import clsx from 'clsx'
import { Box } from '@mui/material';
// ----------------------------------------------------------------------

export type HeaderSectionProps = AppBarProps & {
  layoutQuery?: Breakpoint;
  disableOffset?: boolean;
  disableElevation?: boolean;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    container?: ContainerProps;
    centerArea?: React.ComponentProps<'div'> & { sx?: SxProps<Theme> };
  };
};

export function HeaderSection({
  sx,
  slots,
  slotProps,
  className,
  disableOffset,
  disableElevation,
  layoutQuery = 'md',
  ...other
}: HeaderSectionProps) {

  return (
    <HeaderRoot
      position="static"
      color="transparent"

      isOffset={true}
      disableOffset={disableOffset}
      disableElevation={disableElevation}

      className={clsx([layoutClasses.header, className])}
      style={{ boxShadow: 'none', }}
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {slots?.topArea}

      <HeaderContainer layoutQuery={layoutQuery} {...slotProps?.container} maxWidth={"100%"} p={4}>
        {slots?.leftArea}

        <HeaderCenterArea {...slotProps?.centerArea}>{slots?.centerArea}</HeaderCenterArea>

        {slots?.rightArea}
      </HeaderContainer>

      {slots?.bottomArea}
    </HeaderRoot>
  );
}

// ----------------------------------------------------------------------

type HeaderRootProps = Pick<HeaderSectionProps, 'disableOffset' | 'disableElevation'> & {
  isOffset: boolean;
};

const HeaderRoot = styled(AppBar, {
  shouldForwardProp: (prop: string) =>
    !['isOffset', 'disableOffset', 'disableElevation', 'sx'].includes(prop),
})<HeaderRootProps>(({ disableOffset }) => {
  const pauseZindex = { top: -1, bottom: -2 };
  const bgStyles: CSSObject = {

    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: pauseZindex.top,

  };

  return {
    zIndex: 'var(--layout-header-zIndex)',
    ...(!disableOffset && { '&::before': bgStyles }),
  };
});

const HeaderContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['layoutQuery', 'sx'].includes(prop),
})<Pick<HeaderSectionProps, 'layoutQuery'>>(({ layoutQuery = 'md', theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'var(--color)',
  height: 'var(--layout-header-mobile-height)',
  backgroundColor: 'var(--layout-header-bg-color)',
  borderRadius: 'var(--layout-header-border-radius)',
  [theme.breakpoints.up(layoutQuery)]: { height: 'var(--layout-header-desktop-height)' },
}));

const HeaderCenterArea = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
}));
