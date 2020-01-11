declare namespace NodeJS {
  export interface ProcessEnv {
    RAZZLE_PUBLIC_DIR: string;
    CONFIG_PATH?: string;
  }
}

declare module "cubee-server" {
  export interface ApplicationConfig {
    secretFoo: string;
    secretBar: string;
  }
}
