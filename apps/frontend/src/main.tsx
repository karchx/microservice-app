import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

import App from './app/app';
import { store } from './store/store';
import { ConfigContext, configContextValue } from './context/routesContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache(),
});

root.render(
  <StrictMode>
    <ConfigContext.Provider value={configContextValue}>
      <Provider store={store}>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </BrowserRouter>
      </Provider>
    </ConfigContext.Provider>
  </StrictMode>
);
