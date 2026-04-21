import chroma from 'chroma-js';

const colors = {
  primary: '#00d4ff',
  secondary: '#00ff9d',
  tertiary: '#8b5cf6',
  background: '#0a0a0a',
  surface: '#141414',
  paper: '#1a1a1a',
  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    disabled: '#666666',
  },
  error: '#ff5252',
  warning: '#ffb74d',
  info: '#29b6f6',
  success: '#00e676',
};

export const palette = {
  mode: 'dark',
  primary: {
    main: colors.primary,
    light: chroma(colors.primary).alpha(0.8).css(),
    dark: chroma(colors.primary).darken(0.5).css(),
    contrastText: '#000000',
  },
  secondary: {
    main: colors.secondary,
    light: chroma(colors.secondary).alpha(0.8).css(),
    dark: chroma(colors.secondary).darken(0.5).css(),
    contrastText: '#000000',
  },
  error: {
    main: colors.error,
  },
  warning: {
    main: colors.warning,
  },
  info: {
    main: colors.info,
  },
  success: {
    main: colors.success,
  },
  background: {
    default: colors.background,
    paper: colors.paper,
  },
  text: {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    disabled: colors.text.disabled,
  },
  divider: chroma(colors.text.disabled).alpha(0.2).css(),
  action: {
    hover: chroma(colors.primary).alpha(0.08).css(),
    selected: chroma(colors.primary).alpha(0.12).css(),
    disabled: colors.text.disabled,
    disabledBackground: chroma(colors.text.disabled).alpha(0.12).css(),
  },
};

export const accentColors = {
  cyan: colors.primary,
  green: colors.secondary,
  purple: colors.tertiary,
  cyanLight: chroma(colors.primary).alpha(0.15).css(),
  greenLight: chroma(colors.secondary).alpha(0.15).css(),
  purpleLight: chroma(colors.tertiary).alpha(0.15).css(),
};

export default palette;