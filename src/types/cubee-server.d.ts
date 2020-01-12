import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { History } from 'history';

declare module "cubee-server" {
  export interface ApplicationConfig {
    secretFoo: string;
    secretBar: string;
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
