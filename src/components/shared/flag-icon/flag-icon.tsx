
import { styled } from '@mui/material/styles';

import { flagIconClasses } from './classes';
import { mergeClasses } from '../../../utils/style';

// ----------------------------------------------------------------------

export type FlagIconProps = React.ComponentProps<typeof FlagRoot> & {
  code?: string;
};

export function FlagIcon({ code, className, sx, ...other }: FlagIconProps) {
  if (!code) {
    return null;
  }

  return (
    <FlagRoot className={mergeClasses([flagIconClasses.root, className])} sx={sx} {...other}>
      <FlagImg
        loading="lazy"
        alt={code}
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code?.toUpperCase()}.svg`}
        className={flagIconClasses.img}
      />
    </FlagRoot>
  );
}

// ----------------------------------------------------------------------

const FlagRoot = styled('span')(({ theme }) => ({
  width: 26,
  height: 23,
  flexShrink: 0,
  overflow: 'hidden',
  borderRadius: '5px',
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
  backgroundColor: theme.vars.palette.background.neutral,
}));

const FlagImg = styled('img')(() => ({
  width: '100%',
  height: '100%',
  maxWidth: 'unset',
  objectFit: 'cover',
}));
