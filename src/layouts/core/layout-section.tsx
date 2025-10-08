import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

import clsx from 'clsx'
import { styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import { layoutClasses } from './classes';
import { layoutSectionVars } from './css-vars';
import { DashboardContent } from '../dashboard';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export type LayoutSectionProps = React.ComponentProps<'div'> & {
  sx?: SxProps<Theme>;
  cssVars?: CSSObject;
  children?: React.ReactNode;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
};

export function LayoutSection({
  sx,
  cssVars,
  children,
  footerSection,
  headerSection,
  sidebarSection,
  className,
  ...other
}: LayoutSectionProps) {
  const inputGlobalStyles = (
    <GlobalStyles styles={(theme) => ({ body: { ...layoutSectionVars(theme), ...cssVars } })} />
  );

  return (
    <>
      {inputGlobalStyles}
      <DashboardContent maxWidth="xl">
        <LayoutRoot
          id="root__layout"
          className={clsx([layoutClasses.root, className])}
          sx={sx}

          {...other}
        >
          {sidebarSection ? (
            <>

              <LayoutSidebarContainer className={layoutClasses.sidebarContainer}>
                <Box display={"flex"} gap={5}>
                  {sidebarSection}
                  <Box flex={1} display={"flex"} flexDirection={'column'}>
                    {headerSection}

                    {children}
                    {footerSection}

                  </Box>
                </Box>


              </LayoutSidebarContainer>
            </>
          ) : (
            <>
              {headerSection}
              {children}
              {footerSection}
            </>
          )}
        </LayoutRoot>
      </DashboardContent>

    </>
  );
}

// ----------------------------------------------------------------------

const LayoutRoot = styled('div')``;

const LayoutSidebarContainer = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',

}));
