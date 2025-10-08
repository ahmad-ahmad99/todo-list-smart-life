import type { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function layoutSectionVars(theme: Theme) {
  return {
    '--layout-nav-zIndex': theme.zIndex.drawer + 1,
    '--layout-nav-mobile-width': '288px',
    '--layout-header-blur': '8px',

    '--layout-header-zIndex': theme.zIndex.appBar + 1,
    '--layout-header-mobile-height': '64px',
    '--layout-header-desktop-height': '64px',
    '--layout-header-border-radius': '12px',

    '--layout-header-bg-color': "#fff",
    '--color': "#000",


    '--layout-footer-mobile-height': '64px',
    '--layout-footer-desktop-height': '64px',
    '--layout-footer-border-radius': '12px',

    '--layout-footer-bg-color': "#fff",
  };
}
