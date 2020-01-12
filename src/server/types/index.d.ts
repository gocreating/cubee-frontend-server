declare namespace NodeJS {
  export interface ProcessEnv {
    RAZZLE_PUBLIC_DIR: string;
    RAZZLE_ASSETS_MANIFEST: string;
    PORT: string;
    CONFIG_PATH?: string;
  }
}

declare module "cubee-server" {
  export interface ApplicationConfig {
    secretFoo: string;
    secretBar: string;
  }

  export interface RequestCookie {
    access_token_cookie?: string;
    csrf_access_token?: string;
  }
}
