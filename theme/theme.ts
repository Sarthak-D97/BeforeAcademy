'use client';
import { createTheme } from '@mui/material/styles';

// 1. Define the Font Family
const snPro = "'SN Pro', sans-serif";

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#328af1', // "Laracasts Blue"
      },
      secondary: {
        main: '#ec4899', // Pink accent
      },
      ...(mode === 'dark' ? {
        // PROFESSIONAL DARK MODE
        background: {
          default: '#0f172a', // Deep Navy (Slate 950)
          paper: '#1e293b',   // Lighter Navy (Slate 800)
        },
        text: {
          primary: '#f8fafc', // Slate 50
          secondary: '#94a3b8', // Slate 400
        },
        divider: 'rgba(148, 163, 184, 0.12)',
        action: {
          hover: 'rgba(50, 138, 241, 0.08)',
          selected: 'rgba(50, 138, 241, 0.16)',
        }
      } : {
        // CLEAN LIGHT MODE
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
      // 2. Apply SN Pro Globally
      fontFamily: snPro,
      
      // Fine-tune headings if needed
      h1: { fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontWeight: 700, letterSpacing: '-0.01em' },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' }, // Modern buttons
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