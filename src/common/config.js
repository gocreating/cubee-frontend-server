import env from './utils/env';

let apiHost;

if (env.isStaging) {
  apiHost = 'https://api.stg.cubee.cc';
} else if (env.isProduction) {
  apiHost = 'https://api.cubee.cc';
}

export const API_HOST = apiHost;
