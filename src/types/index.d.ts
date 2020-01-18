declare namespace NodeJS {
  export interface ProcessEnv {
    RAZZLE_PUBLIC_DIR: string;
    RAZZLE_ASSETS_MANIFEST: string;
    PORT: string;
    CONFIG_PATH?: string;
  }
}

interface Window {
  __PRELOADED_STATE__: object;
  CUBEE_ENV: 'staging' | 'production';
}

declare module 'cubee' {}
declare module '@redux-saga/simple-saga-monitor' {}

// https://stackoverflow.com/a/45887328/2443984
declare module '*.svg' {
  const content: string;
  export default content;
}
