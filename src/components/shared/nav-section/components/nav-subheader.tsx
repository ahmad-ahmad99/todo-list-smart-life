import type { ListSubheaderProps } from '@mui/material/ListSubheader';


import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { navSectionClasses } from '../styles';
import clsx from 'clsx';

// ----------------------------------------------------------------------

export type NavSubheaderProps = ListSubheaderProps & { open?: boolean };

export const NavSubheader = styled(({ open, children, className, ...other }: NavSubheaderProps) => (
  <ListSubheader
    disableSticky
    component="div"
    {...other}
    className={clsx([navSectionClasses.subheader, className])}
  >
    {open ? (
      <ArrowDropDownIcon sx={{ fontSize: 16 }} />
    ) : (
      <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
    )}

    {children}
  </ListSubheader>
))(({ theme }) => ({
  ...theme.typography.overline,
  cursor: 'pointer',
  alignItems: 'center',
  position: 'relative',
  gap: theme.spacing(1),
  display: 'inline-flex',
  alignSelf: 'flex-start',
  color: 'var(--nav-subheader-color)',
  padding: theme.spacing(2, 1, 1, 1.5),
  fontSize: theme.typography.pxToRem(11),
  transition: theme.transitions.create(['color', 'padding-left'], {
    duration: theme.transitions.duration.standard,
  }),

}));
