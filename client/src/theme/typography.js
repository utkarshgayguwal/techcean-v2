const fontFamily = {
  display: '"Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  body: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  mono: '"JetBrains Mono", "Roboto Mono", monospace',
};

export const typography = {
  fontFamily: fontFamily.body,
  h1: {
    fontFamily: fontFamily.display,
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: fontFamily.display,
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: fontFamily.display,
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: fontFamily.display,
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.35,
  },
  h5: {
    fontFamily: fontFamily.display,
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: fontFamily.display,
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  subtitle1: {
    fontFamily: fontFamily.body,
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  subtitle2: {
    fontFamily: fontFamily.body,
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  body1: {
    fontFamily: fontFamily.body,
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontFamily: fontFamily.body,
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  button: {
    fontFamily: fontFamily.display,
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.02em',
    textTransform: 'none',
  },
  caption: {
    fontFamily: fontFamily.body,
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
  },
  overline: {
    fontFamily: fontFamily.display,
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
};

export default typography;