import { useState, useEffect } from 'react';
import { useSearchParams } from '../../../hooks/routes';
import { useAuthContext } from '../../../hooks/auth/jwt';
import { CONFIG } from '../../../global-config';
import { SplashScreen } from '../../shared/loading-screen';


// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: GuestGuardProps) {
  const searchParams = useSearchParams();

  const { loading, authenticated } = useAuthContext();

  const returnTo = searchParams.get('returnTo') ?? CONFIG.auth.redirectPath;

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    if (authenticated) {
      // Redirect authenticated users to the returnTo path
      // Using `window.location.href` instead of `router.replace` to avoid unnecessary re-rendering
      // that might be caused by the AuthGuard component
      window.location.href = returnTo;
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
