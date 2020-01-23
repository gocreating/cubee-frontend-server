import { ApplicationEnvironment } from 'cubee';

const isServer = (typeof window === 'undefined');
const isBrowser = !isServer;

const isStaging = (
  isBrowser
    ? (window.CUBEE_ENV === 'staging')
    : (process.env.CUBEE_ENV === 'staging')
);
const isTesting = (process.env.NODE_ENV === 'test');
const isProduction = (
  isBrowser
    ? (window.CUBEE_ENV === 'production')
    : (process.env.CUBEE_ENV === 'production')
);

const env: ApplicationEnvironment = {
  isServer,
  isBrowser,
  isStaging,
  isTesting,
  isProduction,
};

export default env;
