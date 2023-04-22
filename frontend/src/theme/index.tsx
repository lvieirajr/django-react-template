import React, { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import customShadows from './customShadows';
import GlobalStyles from './GlobalStyles';
import palette from './palette';
import shadows from './shadows';
import typography from './typography';

const ThemeProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 4 },
    }),
    [],
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
