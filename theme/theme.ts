'use client';
import { createTheme, alpha } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

// We define a function to allow toggling, but we prioritize Dark Mode aesthetics
export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#328af1', // "Laracasts Blue" - pops on dark
      },
      secondary: {
        main: '#ec4899', // Pink accent
      },
      ...(mode === 'dark' ? {
        // PROFESSIONAL DARK MODE PALETTE
        background: {
          default: '#0f172a', // Deep Navy (Slate 950) - NOT GREY
          paper: '#1e293b',   // Lighter Navy (Slate 800)
        },
        text: {
          primary: '#f8fafc', // Slate 50
          secondary: '#94a3b8', // Slate 400
        },
        divider: 'rgba(148, 163, 184, 0.12)', // Subtle borders
        action: {
          hover: 'rgba(50, 138, 241, 0.08)', // Blue-tinted hover
          selected: 'rgba(50, 138, 241, 0.16)',
        }
      } : {
        // Clean Light Mode (just in case)
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
      fontFamily: roboto.style.fontFamily,
      h3: { fontWeight: 800, letterSpacing: '-0.02em' },
      h4: { fontWeight: 700, letterSpacing: '-0.01em' },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' }, // Removes MUI's default elevation overlay
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)', // Glassmorphism effect
          },
        },
      },
    },
  });
};