import { ApplicationEnvironment } from 'cubee';

const isServer = (typeof window === 'undefined');
const isBrowser = !isServer;
const env: ApplicationEnvironment = {
  isServer,
  isBrowser,
  isStaging: (
    isBrowser
      ? (window.CUBEE_ENV === 'staging')
      : (process.env.CUBEE_ENV === 'staging')
  ),
  isTesting: (
    process.env.NODE_ENV === 'test'
  ),
  isProduction: (
    isBrowser
      ? (window.CUBEE_ENV === 'production')
      : (process.env.CUBEE_ENV === 'production')
  ),
};

export default env;
