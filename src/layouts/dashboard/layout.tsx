import type { Breakpoint } from '@mui/material/styles';
import type { MainSectionProps, HeaderSectionProps, LayoutSectionProps } from '../core';


import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';


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
          />
          <img src={`${CONFIG.assetsDir}/assets/icons/Logo.png`} width={220} />
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 2 } }}>

          {/** @slot messages */}
          <IconButton
            sx={{ backgroundColor: "#fff", borderRadius: "50%", width: "40px", height: "40px" }}
            aria-label="Account button"
          >
            <img src={`${CONFIG.assetsDir}/assets/icons/home/ic_chat.svg`} width={"30px"} />
          </IconButton>
          {/** @slot Notifications */}
          <IconButton
            sx={{ backgroundColor: "#fff", borderRadius: "50%", width: "40px", height: "40px" }}
            aria-label="Account button"
          >
            <img src={`${CONFIG.assetsDir}/assets/icons/home/notification.png`} width={"30px"} />

          </IconButton>
          {/** @slot Account drawer */}
          <AccountDrawer data={_account} />
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

  const renderFooter = () => null;

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
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}
