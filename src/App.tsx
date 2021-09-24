import { FC } from 'react';

import { Provider } from 'react-redux';

import Router from 'routers/Router';

import store from 'store';

const App: FC = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
