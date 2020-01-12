import { Store } from 'redux';
import { SagaMiddleware, END } from '@redux-saga/core';

declare module 'redux' {
  interface Store extends Store {
    runSaga: SagaMiddleware.run;
    close: () => END;
  }
}
