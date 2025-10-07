import { useEffect } from 'react'
import { usePathname } from './hooks/routes/use-pathname';
import './index.css';
import { AuthProvider } from './context/auth/jwt';

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  return (
    <>
      <AuthProvider>

        {children}
      </AuthProvider>
    </>
  )
}



function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}