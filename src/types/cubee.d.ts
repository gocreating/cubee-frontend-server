import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { History } from 'history';

declare module 'cubee' {
  export interface ApplicationConfig {
    secretFoo: string;
    secretBar: string;
  }

  export interface ApplicationEnvironment {
    isServer: boolean;
    isBrowser: boolean;
    isStaging: boolean;
    isTesting: boolean;
    isProduction: boolean;
  }

  export interface RequestCookie {
    access_token_cookie?: string;
    csrf_access_token?: string;
  }

  export interface ConfiguredStore {
    store: Store;
    persistor?: Persistor;
    history?: History;
  }
}
