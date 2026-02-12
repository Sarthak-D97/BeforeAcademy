'use client';

import { createTheme, alpha, PaletteOptions, PaletteColor, Color, TypographyVariantsOptions } from '@mui/material/styles';

// ----------------------------------------------------------------------
// TYPOGRAPHY HELPERS
// ----------------------------------------------------------------------

export function remToPx(value: string) { 
  return Math.round(parseFloat(value) * 16); 
} 

export function pxToRem(value: number) { 
  return `${value / 16}rem`; 
} 

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) { 
  return { 
    '@media (min-width:600px)': { 
      fontSize: pxToRem(sm), 
    }, 
    '@media (min-width:900px)': { 
      fontSize: pxToRem(md), 
    }, 
    '@media (min-width:1200px)': { 
      fontSize: pxToRem(lg), 
    }, 
  }; 
} 

const FONT_PRIMARY = `var(--font-poppins)`; // Google Font 

const typography: TypographyVariantsOptions = { 
  fontFamily: FONT_PRIMARY, 
  fontWeightRegular: 400, 
  fontWeightMedium: 600, 
  fontWeightBold: 700, 
  h1: { 
    fontWeight: 700, 
    lineHeight: 80 / 64, 
    fontSize: pxToRem(28), 
    ...responsiveFontSizes({ sm: 32, md: 36, lg: 40 }), 
  }, 
  h2: { 
    fontWeight: 700, 
    lineHeight: 64 / 48, 
    fontSize: pxToRem(24), 
    ...responsiveFontSizes({ sm: 28, md: 32, lg: 36 }), 
  }, 
  h3: { 
    fontWeight: 700, 
    lineHeight: 1.5, 
    fontSize: pxToRem(22), 
    ...responsiveFontSizes({ sm: 24, md: 28, lg: 32 }), 
  }, 
  h4: { 
    fontWeight: 700, 
    lineHeight: 1.5, 
    fontSize: pxToRem(20), 
    ...responsiveFontSizes({ sm: 22, md: 24, lg: 28 }), 
  }, 
  h5: { 
    fontWeight: 700, 
    lineHeight: 1.5, 
    fontSize: pxToRem(18), 
    ...responsiveFontSizes({ sm: 20, md: 22, lg: 24 }), 
  }, 
  h6: { 
    fontWeight: 700, 
    lineHeight: 28 / 18, 
    fontSize: pxToRem(16), 
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 22 }), 
  }, 
  subtitle1: { 
    fontWeight: 600, 
    lineHeight: 1.5, 
    fontSize: pxToRem(15), 
  }, 
  subtitle2: { 
    fontWeight: 600, 
    lineHeight: 22 / 14, 
    fontSize: pxToRem(13), 
  }, 
  body1: { 
    lineHeight: 1.5, 
    fontSize: pxToRem(15), 
  }, 
  body2: { 
    lineHeight: 22 / 14, 
    fontSize: pxToRem(13), 
  }, 
  caption: { 
    lineHeight: 1.5, 
    fontSize: pxToRem(12), 
  }, 
  overline: { 
    fontWeight: 700, 
    lineHeight: 1.5, 
    fontSize: pxToRem(12), 
    textTransform: 'uppercase', 
  }, 
  button: { 
    fontWeight: 700, 
    lineHeight: 24 / 14, 
    fontSize: pxToRem(14), 
    textTransform: 'capitalize', 
  }, 
}; 

// ----------------------------------------------------------------------
// CONSTANTS & COLORS
// ----------------------------------------------------------------------

export const BLACK: Color = {
  50: '#F2F2F2',
  100: '#D9D9D9',
  200: '#B3B3B3',
  300: '#8C8C8C',
  400: '#666666',
  500: '#404040',
  600: '#262626',
  700: '#1A1A1A',
  800: '#121212',
  900: '#0D0D0D',
  A100: '#121212',
  A200: '#252525',
  A400: '#0A0A0A',
  A700: '#000000',
};

export const WHITE: Color = {
  50: '#FAFAFA',
  100: '#F4F4F5',
  200: '#E5E5E5',
  300: '#D1D1D1',
  400: '#A3A3A3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  A100: '#F9f9f9',
  A200: '#E9E9E9',
  A400: '#A0A0A0',
  A700: '#616161',
};

export const PRIMARY: PaletteColor = {
  light: '#60A5FA',
  main: '#2563EB',
  dark: '#1D4ED8',
  contrastText: '#FFFFFF',
};

export const SECONDARY: PaletteColor = {
  light: '#FB7185',
  main: '#F43F5E',
  dark: '#E11D48',
  contrastText: '#FFFFFF',
};

export const INFO: PaletteColor = {
  light: '#7DD3FC',
  main: '#0EA5E9',
  dark: '#0284C7',
  contrastText: '#FFFFFF',
};

export const SUCCESS: PaletteColor = {
  light: '#6EE7B7',
  main: '#10B981',
  dark: '#059669',
  contrastText: '#FFFFFF',
};

export const WARNING: PaletteColor = {
  light: '#FDE047',
  main: '#EAB308',
  dark: '#CA8A04',
  contrastText: WHITE[800],
};

export const ERROR: PaletteColor = {
  light: '#FDA4AF',
  main: '#F43F5E',
  dark: '#E11D48',
  contrastText: '#FFFFFF',
};

// ----------------------------------------------------------------------
// PALETTE DEFINITIONS
// ----------------------------------------------------------------------

const lightPalette: PaletteOptions = {
  mode: 'light',
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: WHITE, // Note: Based on your input, you mapped grey to WHITE values for light mode
  divider: alpha(WHITE[600], 0.24),
  text: {
    primary: WHITE[800],
    secondary: WHITE[600],
    disabled: WHITE[500],
  },
  background: {
    paper: '#fff',
    default: '#fff',
  },
  action: {
    active: WHITE[600],
    hover: alpha(WHITE[500], 0.08),
    selected: alpha(WHITE[500], 0.16),
    disabled: alpha(WHITE[500], 0.8),
    disabledBackground: alpha(WHITE[500], 0.24),
    focus: alpha(WHITE[500], 0.24),
  },
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: {
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    contrastText: BLACK[100],
  },
  warning: {
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    contrastText: BLACK[100],
  },
  error: ERROR,
  grey: BLACK, // Note: Mapped grey to BLACK values for dark mode
  divider: alpha(BLACK[100], 0.24),
  text: {
    primary: BLACK[100],
    secondary: BLACK[300],
    disabled: BLACK[400],
  },
  background: {
    paper: BLACK[800],
    default: BLACK[900],
  },
  action: {
    active: BLACK[400],
    hover: alpha(BLACK[200], 0.08),
    selected: alpha(BLACK[300], 0.12),
    disabled: alpha(BLACK[600], 0.4),
    disabledBackground: alpha(BLACK[600], 0.24),
    focus: alpha(BLACK[200], 0.24),
  },
};

// ----------------------------------------------------------------------
// THEME CREATION
// ----------------------------------------------------------------------

export const getTheme = (mode: 'light' | 'dark') => {
  const currentPalette = mode === 'dark' ? darkPalette : lightPalette;

  return createTheme({
    palette: currentPalette,
    typography,
    shadows: [
      'none',
      '0px 2px 4px rgba(0,0,0,0.05)',
      '0px 4px 8px rgba(0,0,0,0.08)',
      '0px 8px 16px rgba(0,0,0,0.1)',
      '0px 12px 24px rgba(0,0,0,0.12)',
      '0px 16px 32px rgba(0,0,0,0.14)',
      ...Array(19).fill('none')
    ] as any,
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { 
            backgroundImage: 'none',
            borderRadius: 12,
            border: mode === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: PRIMARY.dark,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: alpha(
              currentPalette.background?.default || '#fff', 
              0.8
            ),
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid',
            borderColor: currentPalette.divider,
            boxShadow: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
            border: 'none',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0px 12px 30px rgba(0,0,0,0.1)',
            },
          },
        },
      },
    },
  });
};