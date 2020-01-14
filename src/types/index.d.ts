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
}

declare module 'cubee' {}
declare module "@redux-saga/simple-saga-monitor" {}
