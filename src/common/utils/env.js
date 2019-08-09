export default {
  isServer: (typeof window === 'undefined'),
  isBrowser: (typeof window !== 'undefined'),
  isProduction: (process.env.NODE_ENV === 'production'),
};
