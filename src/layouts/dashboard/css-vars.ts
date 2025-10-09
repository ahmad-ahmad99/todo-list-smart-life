import type { Theme, CSSObject } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function dashboardLayoutVars(theme: Theme) {
  return {
    '--layout-transition-easing': 'linear',
    '--layout-transition-duration': '120ms',
    '--layout-nav-mini-width': '88px',
    '--layout-nav-vertical-width': '300px',
    '--layout-nav-horizontal-height': '64px',
    '--layout-dashboard-content-pt': theme.spacing(2),
    '--layout-dashboard-content-pb': theme.spacing(2),
    '--layout-dashboard-content-px': theme.spacing(1),
  };
}

// ----------------------------------------------------------------------

export function dashboardNavColorVars(
  theme: Theme,
  navColor = 'integrate',
  navLayout = 'vertical'
): Record<'layout' | 'section', CSSObject | undefined> {
  const {
    palette,
  } = theme;

  switch (navColor) {
    case 'integrate':
      return {
        layout: {
          '--layout-nav-bg': '#ffffff',
          '--layout-nav-horizontal-bg': palette.background.default,
          '--layout-nav-border-color': palette.grey['500'],
          '--layout-nav-text-primary-color': palette.text.primary,
          '--layout-nav-text-secondary-color': palette.text.secondary,
          '--layout-nav-text-disabled-color': palette.text.disabled,

        },
        section: undefined,
      };
    case 'apparent':
      return {
        layout: {
          '--layout-nav-bg': palette.grey[900],
          '--layout-nav-horizontal-bg': palette.grey[900],
          '--layout-nav-border-color': 'transparent',
          '--layout-nav-text-primary-color': palette.common.white,
          '--layout-nav-text-secondary-color': palette.grey[500],
          '--layout-nav-text-disabled-color': palette.grey[600],

        },
        section: {
          // caption
          '--nav-item-caption-color': palette.grey[600],
          // subheader
          '--nav-subheader-color': palette.grey[600],
          '--nav-subheader-hover-color': palette.common.white,
          // item
          '--nav-item-color': palette.grey[500],
          '--nav-item-root-active-color': palette.primary.light,
          '--nav-item-root-open-color': palette.common.white,
          // bullet
          '--nav-bullet-light-color': palette.common.white,
          // sub
          ...(navLayout === 'vertical' && {
            '--nav-item-sub-active-color': palette.common.white,
            '--nav-item-sub-open-color': palette.common.white,
          }),
        },
      };
    default:
      throw new Error(`Invalid color: ${navColor}`);
  }
}
