import type { ButtonProps } from '@mui/material/Button';

import { useCallback } from 'react';

import Button from '@mui/material/Button';
import { useRouter } from '../../hooks/routes';
import { useAuthContext } from '../../hooks/auth/jwt';
import { signOut } from '../../context/auth/jwt';
import { useTranslate } from '../../locales';


// ----------------------------------------------------------------------

type Props = ButtonProps & {
  onClose?: () => void;
};

export function SignOutButton({ onClose, sx, ...other }: Props) {
  const router = useRouter();
  const { t } = useTranslate();
  const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await checkUserSession?.();

      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }, [checkUserSession, onClose, router]);

  return (
    <Button
      fullWidth
      variant="outlined"
      size="large"
      color="error"
      onClick={handleLogout}
      sx={sx}
      {...other}
    >
      {t('logout')}

    </Button>
  );
}
