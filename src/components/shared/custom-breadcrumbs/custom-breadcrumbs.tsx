import type { Theme, SxProps } from '@mui/material/styles';
import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import type { MoreLinksProps } from './more-links';
import type { BreadcrumbsLinkProps } from './breadcrumb-link';

import Breadcrumbs from '@mui/material/Breadcrumbs';

import { BackLink } from './back-link';
import { MoreLinks } from './more-links';
import { BreadcrumbsLink } from './breadcrumb-link';
import {
  BreadcrumbsRoot,
  BreadcrumbsHeading,
  BreadcrumbsContent,
  BreadcrumbsContainer,
  BreadcrumbsSeparator,
} from './styles';
import { useTranslate } from '../../../locales';

// ----------------------------------------------------------------------

export type CustomBreadcrumbsSlotProps = {
  breadcrumbs: BreadcrumbsProps;
  moreLinks: Omit<MoreLinksProps, 'links'>;
  heading: React.ComponentProps<typeof BreadcrumbsHeading>;
  content: React.ComponentProps<typeof BreadcrumbsContent>;
  container: React.ComponentProps<typeof BreadcrumbsContainer>;
};

export type CustomBreadcrumbsSlots = {
  breadcrumbs?: React.ReactNode;
};

export type CustomBreadcrumbsProps = React.ComponentProps<'div'> & {
  sx?: SxProps<Theme>;
  heading?: string;
  activeLast?: boolean;
  backHref?: string;
  action?: React.ReactNode;
  links?: BreadcrumbsLinkProps[];
  moreLinks?: MoreLinksProps['links'];
  slots?: CustomBreadcrumbsSlots;
  slotProps?: Partial<CustomBreadcrumbsSlotProps>;
};

export function CustomBreadcrumbs({
  sx,
  action,
  backHref,
  heading,
  slots = {},
  links = [],
  moreLinks = [],
  slotProps = {},
  activeLast = false,
  ...other
}: CustomBreadcrumbsProps) {
  const lastLink = links[links.length - 1]?.name;
  const { currentLang } = useTranslate()
  console.log("currentLang", currentLang);

  const renderHeading = () => (
    <BreadcrumbsHeading {...slotProps?.heading}>
      {backHref ? <BackLink href={backHref} label={heading} /> : heading}
    </BreadcrumbsHeading>
  );

  const renderLinks = () =>
    slots?.breadcrumbs ?? (
      <Breadcrumbs  {...slotProps?.breadcrumbs} sx={{
        alignItems: 'center',
        gap: 4,
        '.MuiBreadcrumbs-separator': {
          display: 'none'
        },
        '.MuiBreadcrumbs-ol': {
          gap: '12px'
        }
      }}>
        {links.map((link, index) => (
          <BreadcrumbsLink
            key={link.name ?? index}
            icon={link.icon}
            href={link.href}
            name={link.name}
            disabled={link.name === lastLink && !activeLast}
            sx={{
              color: link.name === lastLink ? "#00579F" : '#4D637C',
              fontSize: '16px',

              ".MuiSvgIcon-root": {
                transform: currentLang?.value == 'ar' ? "rotate(180deg)" : "inherit",
                fontSize: '20px',

              }
            }}
          />
        ))}
      </Breadcrumbs>
    );

  const renderMoreLinks = () => <MoreLinks links={moreLinks} {...slotProps?.moreLinks} />;

  return (
    <BreadcrumbsRoot sx={{ ...sx, mb: 0 }} {...other}>
      <BreadcrumbsContainer
        {...slotProps?.container}

        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <BreadcrumbsContent {...slotProps?.content} >
          {(heading || backHref) && renderHeading()}
          {(!!links.length || slots?.breadcrumbs) && renderLinks()}
        </BreadcrumbsContent>
        {action}
      </BreadcrumbsContainer>

      {!!moreLinks?.length && renderMoreLinks()}
    </BreadcrumbsRoot>
  );
}
