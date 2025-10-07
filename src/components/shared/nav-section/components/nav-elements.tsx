
import { styled } from '@mui/material/styles';

import { navSectionClasses } from '../styles';
import clsx from 'clsx';

// ----------------------------------------------------------------------

export const Nav = styled('nav')``;

// ----------------------------------------------------------------------

type NavLiProps = React.ComponentProps<'li'> & {
  disabled?: boolean;
};

export const NavLi = styled(
  (props: NavLiProps) => (
    <li {...props} className={clsx([navSectionClasses.li, props.className])} />
  ),
  { shouldForwardProp: (prop: string) => !['disabled', 'sx'].includes(prop) }
)(() => ({
  display: 'inline-block',
  variants: [{ props: { disabled: true }, style: { cursor: 'not-allowed' } }],
}));

// ----------------------------------------------------------------------

type NavUlProps = React.ComponentProps<'ul'>;

export const NavUl = styled((props: NavUlProps) => (
  <ul {...props} className={clsx([navSectionClasses.ul, props.className])} />
))(() => ({ display: 'flex', flexDirection: 'column' }));
