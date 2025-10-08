import type { Theme, Components } from '@mui/material/styles';
import type { ThemeOptions } from './types';

import { createTheme as createMuiTheme } from '@mui/material/styles';

import { mixins } from './core/mixins';
import { opacity } from './core/opacity';
import { themeConfig } from './theme-config';
import { applySettingsToTheme, applySettingsToComponents } from './with-settings';
import type { SettingsState } from '../context/settings';
import { palette } from './core';

// ----------------------------------------------------------------------

export const baseTheme: ThemeOptions = {
  colorSchemes: {
    light: {
      palette: palette.light,
      opacity,
    },
    dark: {
      palette: palette.dark,
      opacity,
    },
  },
  mixins,
  shape: { borderRadius: 8 },
  direction: themeConfig.direction,
  cssVariables: themeConfig.cssVariables,
};

// ----------------------------------------------------------------------

type CreateThemeProps = {
  settingsState?: SettingsState;
  themeOverrides?: ThemeOptions;
  localeComponents?: { components?: Components<Theme> };
};

export function createTheme({
  settingsState,
  themeOverrides = {},
  localeComponents = {},
}: CreateThemeProps = {}): Theme {
  // Update core theme settings (colorSchemes, typography, etc.)
  const updatedCore = settingsState ? applySettingsToTheme(baseTheme, settingsState) : baseTheme;

  // Update component settings (only components)
  const updatedComponents = settingsState ? applySettingsToComponents(settingsState) : {};

  // Create and return the final theme
  const theme = createMuiTheme(updatedCore, updatedComponents, localeComponents, themeOverrides);

  return theme;
}
