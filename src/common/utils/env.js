const isServer = (typeof window === 'undefined');
const isBrowser = !isServer;

export default {
  isServer,
  isBrowser,
  isStaging: (
    isBrowser
      ? (window.CUBEE_ENV === 'staging')
      : (process.env.CUBEE_ENV === 'staging')
  ),
  isProduction: (
    isBrowser
      ? (window.CUBEE_ENV === 'production')
      : (process.env.CUBEE_ENV === 'production')
  ),
};
