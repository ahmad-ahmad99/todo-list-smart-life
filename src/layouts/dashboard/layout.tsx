import type { Breakpoint } from '@mui/material/styles';
import type { MainSectionProps, HeaderSectionProps, LayoutSectionProps } from '../core';


import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { styled, useTheme } from '@mui/material/styles';


import { NavMobile } from './nav-mobile';
import { NavVertical } from './nav-vertical';
import { _account } from '../nav-config-account';
import { MenuButton } from '../components/menu-button';
import { AccountDrawer } from '../components/account-drawer';
import { navData as dashboardNavData } from '../nav-config-dashboard';
import { dashboardLayoutVars, dashboardNavColorVars } from './css-vars';
import { MainSection, layoutClasses, HeaderSection, LayoutSection } from '../core';
import type { NavSectionProps } from '../../components/shared/nav-section';
import { useState } from 'react';
import { CONFIG } from '../../global-config';
import IconButton from '@mui/material/IconButton';
import { FooterSection } from '../core/footer-section';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavSectionProps['data'];
    };
    main?: MainSectionProps;
  };
};

export function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const theme = useTheme();




  const navVars = dashboardNavColorVars(theme);

  const [open, setOpen] = useState<boolean>(false)
  const onOpen = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const navData = slotProps?.nav?.data ?? dashboardNavData;

  const isNavVertical = true;

  const RenderIcons = () => {
    return (
      <>
        {/** @slot Notifications*/}
        <StyledIconButton>
          <img src={`${CONFIG.assetsDir}/assets/icons/home/notification.png`} />
        </StyledIconButton>

        {/** @slot translate */}
        <StyledIconButton>
          <img src={`${CONFIG.assetsDir}/assets/icons/home/translate.png`} />
        </StyledIconButton>

        {/** @slot email */}
        <StyledIconButton>
          <img src={`${CONFIG.assetsDir}/assets/icons/home/email.png`} />
        </StyledIconButton>

        {/** @slot file-text */}
        <StyledIconButton>
          <img src={`${CONFIG.assetsDir}/assets/icons/home/file-text.png`} />
        </StyledIconButton>

        {/** @slot calculator */}
        <StyledIconButton>
          <img src={`${CONFIG.assetsDir}/assets/icons/home/calculator.png`} />
        </StyledIconButton>

        {/** @slot  cpu-setting */}
        <StyledIconButton>
          <img src={`${CONFIG.assetsDir}/assets/icons/home/cpu-setting.png`} />
        </StyledIconButton>

        {/** @slot  laptop */}
        <StyledIconButton>
          <img src={`${CONFIG.assetsDir}/assets/icons/home/laptop.png`} />
        </StyledIconButton>
      </>
    )
  }
  const renderHeader = () => {


    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: null,
      bottomArea: null,
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
          />
          <NavMobile
            data={navData}
            open={open}
            onClose={onClose}
            cssVars={navVars.section}
            slots={
              {
                bottomArea: <>
                  <Box sx={{
                    display: 'flex', alignItems: 'center', gap: 1, flexWrap: "wrap", p: 2
                  }}>

                    <RenderIcons />
                  </Box>
                </>
              }
            }
          />
        </>
      ),
      rightArea: (
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 2 },
          [theme.breakpoints.down(layoutQuery)]: { display: 'none' }
        }}>

          <RenderIcons />

          {/** @slot Account drawer laptop.png */}
          <AccountDrawer data={_account} sx={{
            backgroundColor: '#00579F',
            borderRadius: '50%',
            padding: '12px',
            width: '50px',
            height: '50px'
          }} />
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        disableElevation={isNavVertical}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderSidebar = () => (
    <NavVertical
      data={navData}
      isNavMini={false}
      layoutQuery={layoutQuery}
      cssVars={navVars.section}
      onToggleNav={() => { }
      }
    />
  );

  const renderFooter = () => (

    <FooterSection>

      <img src={`${CONFIG.assetsDir}/assets/footerLogo.png`} height={'30px'} />
      <Typography sx={{ color: '#62748E', fontSize: "16px" }} variant='body1' mx={2}>
        جميع الحقوق محفوظفة لدى
      </Typography>
    </FooterSection>
  );

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={<>{renderHeader()}</>}
      /** **************************************
       * @Sidebar
       *************************************** */
      sidebarSection={renderSidebar()}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...dashboardLayoutVars(theme), ...navVars.layout, ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              // pl: 'var(--layout-nav-vertical-width)',
              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
          width: '100%'

        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}


export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  borderRadius: '12px',
  padding: '12px',
  border: '1px solid #E5E7EB',
  '&:hover': {
    backgroundColor: '#F0F0F0',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },
}));
