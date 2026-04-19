import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import React, { useMemo } from 'react';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

interface RtlProviderProps {
  children: React.ReactNode;
}

export const RtlProvider: React.FC<RtlProviderProps> = ({ children }) => {
  const theme = useMemo(() => createTheme({
    direction: 'rtl',
    typography: {
      fontFamily: '"Tajawal", "Segoe UI", Tahoma, Arial, sans-serif',
      fontSize: 17,
      h1: { fontFamily: '"Amiri", serif', fontWeight: 700 },
      h2: { fontFamily: '"Amiri", serif', fontWeight: 700 },
      h3: { fontFamily: '"Amiri", serif', fontWeight: 700 },
      h4: { fontFamily: '"Amiri", serif', fontWeight: 700 },
      h5: { fontFamily: '"Amiri", serif', fontWeight: 700 },
      h6: { fontFamily: '"Amiri", serif', fontWeight: 700 },
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#C9A84C', // var(--gold-mid)
        light: '#E2C97E', // var(--gold-bright)
        dark: '#8A6D2F', // var(--gold-dim)
      },
      secondary: {
        main: '#F0EBE0', // var(--text-primary)
      },
      background: {
        default: '#080808', // var(--bg-base)
        paper: '#161616', // var(--bg-secondary)
      },
      text: {
        primary: '#F0EBE0', // var(--text-primary)
        secondary: '#A89880', // var(--text-secondary)
        disabled: '#5C5248', // var(--text-muted)
      },
      error: {
        main: '#9B4A4A', // var(--danger)
      },
      success: {
        main: '#4A9B6F', // var(--success)
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: 'none',
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 700,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: '#161616',
            border: '1px solid rgba(255, 255, 255, 0.06)', // var(--glass-border)
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
          body {
            background-color: #080808 !important;
            color: #A89880 !important;
          }
        `,
      },
    },
  }), []);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" style={{ direction: 'rtl', minHeight: '100vh' }}>
          {children}
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};
