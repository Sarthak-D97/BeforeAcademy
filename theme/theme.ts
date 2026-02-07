'use client';
import { createTheme } from '@mui/material/styles';
const snPro = "'SN Pro', sans-serif";

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#328af1',
      },
      secondary: {
        main: '#ec4899',
      },
      ...(mode === 'dark' ? {
        background: {
          default: '#0f172a',
          paper: '#1e293b',  
        },
        text: {
          primary: '#f8fafc', 
          secondary: '#94a3b8', 
        },
        divider: 'rgba(148, 163, 184, 0.12)',
        action: {
          hover: 'rgba(50, 138, 241, 0.08)',
          selected: 'rgba(50, 138, 241, 0.16)',
        }
      } : {
        background: {
          default: '#f8fafc',
          paper: '#ffffff',
        },
        text: {
          primary: '#0f172a',
          secondary: '#64748b',
        },
      }),
    },
    typography: {
      fontFamily: snPro,
      h1: { fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontWeight: 700, letterSpacing: '-0.01em' },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(148, 163, 184, 0.12)' : 'rgba(0, 0, 0, 0.12)',
            boxShadow: 'none',
          },
        },
      },
    },
  });
};