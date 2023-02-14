import React from 'react';
import { createRoot } from 'react-dom/client';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../../store';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/global';

import App from './components/App';

export default function () {
  const app = document.createElement('div');
  app.id = 'durak-helper-root';
  app.attachShadow({ mode: 'open' });

  document.body.appendChild(app);

  const root = createRoot(app.shadowRoot);
  root.render(
    <ThemeProvider theme={theme}>
      <StyleSheetManager target={document.getElementById(app.id).shadowRoot}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalStyles />
            <App />
          </PersistGate>
        </Provider>
      </StyleSheetManager>
    </ThemeProvider>,
  );
}
