import React, { createContext, useContext, useMemo, useState } from 'react';
import * as tokens from '../constants/theme';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children, initial = 'light' }) => {
  const [mode, setMode] = useState(initial);

  const theme = useMemo(() => {
    // build a theme object; keep tokens structure so components can destructure same keys
    const base = {
      COLORS: tokens.COLORS,
      SPACING: tokens.SPACING,
      FONT_SIZES: tokens.FONT_SIZES,
      FONT_WEIGHTS: tokens.FONT_WEIGHTS,
      BORDER_RADIUS: tokens.BORDER_RADIUS,
      SHADOWS: tokens.SHADOWS,
    };

    if (mode === 'dark') {
      // simple dark adjustments (can be extended)
      const darkColors = {
        ...tokens.COLORS,
        background: '#0b1220',
        surface: '#071026',
        white: '#0b1220',
        gray50: '#081224',
        gray900: '#e6eef8',
      };
      return { ...base, COLORS: darkColors, mode };
    }

    return { ...base, mode };
  }, [mode]);

  const toggleTheme = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // fallback to tokens when provider missing
    return {
      COLORS: tokens.COLORS,
      SPACING: tokens.SPACING,
      FONT_SIZES: tokens.FONT_SIZES,
      FONT_WEIGHTS: tokens.FONT_WEIGHTS,
      BORDER_RADIUS: tokens.BORDER_RADIUS,
      SHADOWS: tokens.SHADOWS,
      mode: 'light',
      toggleTheme: () => {},
    };
  }

  return ctx;
};

export default ThemeProvider;
