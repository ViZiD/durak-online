import React from 'react';
import { createRoot } from 'react-dom/client';
import styled, { StyleSheetManager, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../../store';
import { theme } from './styles/theme';

import App from './components/App';

const WidgetContainer = styled.div`
  all: initial;
`;
export default function () {
  const app = document.createElement('div');
  app.id = 'durak-helper-root';
  app.attachShadow({ mode: 'open' });

  document.body.appendChild(app);

  const root = createRoot(app.shadowRoot);
  root.render(
    <ThemeProvider theme={theme}>
      <StyleSheetManager target={document.getElementById(app.id).shadowRoot}>
        <WidgetContainer>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </WidgetContainer>
      </StyleSheetManager>
    </ThemeProvider>,
  );
}
