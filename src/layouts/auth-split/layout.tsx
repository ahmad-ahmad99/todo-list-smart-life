import type { Breakpoint } from '@mui/material/styles';
import type { AuthSplitSectionProps } from './section';
import type { AuthSplitContentProps } from './content';
import type { MainSectionProps, LayoutSectionProps, HeaderSectionProps } from '../core';


import { AuthSplitSection } from './section';
import { AuthSplitContent } from './content';
import { MainSection, LayoutSection } from '../core';
import { CONFIG } from '../../global-config';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type AuthSplitLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
    section?: AuthSplitSectionProps;
    content?: AuthSplitContentProps;
  };
};

export function AuthSplitLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: AuthSplitLayoutProps) {




  const renderMain = () => (
    <MainSection
      {...slotProps?.main}
      sx={[
        (theme) => ({ [theme.breakpoints.up(layoutQuery)]: { flexDirection: 'row' } }),
        ...(Array.isArray(slotProps?.main?.sx) ? slotProps.main.sx : [slotProps?.main?.sx]),
      ]}
    >
      <AuthSplitSection
        layoutQuery={layoutQuery}
        {...slotProps?.section}
      />
      <AuthSplitContent layoutQuery={layoutQuery} {...slotProps?.content} sx={{ backgroundColor: "#f9fcff" }}>
        {children}
      </AuthSplitContent>

    </MainSection>
  );

  return (
    <LayoutSection

      /** **************************************
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ '--layout-auth-content-width': '350px', ...cssVars }}
      sx={sx}
    >
      {renderMain()}

    </LayoutSection>
  );
}
