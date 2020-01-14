import env from './utils/env';

let apiHost: string;

if (env.isProduction) {
  apiHost = 'https://api.cubee.cc';
} else {
  apiHost = 'https://api.stg.cubee.cc';
}

export const API_HOST = apiHost;
