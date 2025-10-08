import { useEffect } from 'react'
import { usePathname } from './hooks/routes/use-pathname';
import './index.css';
import { AuthProvider } from './context/auth/jwt';
import { I18nProvider, LocalizationProvider } from './locales';
import { defaultSettings, SettingsProvider } from './context/settings';
import { themeConfig, ThemeProvider } from './theme';

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  return (
    <>
      <I18nProvider>

        <AuthProvider>
          <SettingsProvider defaultSettings={defaultSettings}>
            <LocalizationProvider>
              <ThemeProvider
                modeStorageKey={themeConfig.modeStorageKey}
                defaultMode={themeConfig.defaultMode}
              >

                {children}
              </ThemeProvider>
            </LocalizationProvider>
          </SettingsProvider>
        </AuthProvider>
      </I18nProvider>
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