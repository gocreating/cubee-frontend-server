import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore';
import App from './index';

const { store } = configureStore({}, '/');

describe('<App />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
      div,
    );
  });
});
