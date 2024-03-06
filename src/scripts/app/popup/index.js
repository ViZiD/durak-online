import { render } from 'preact';
import App from './components/App';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { popupTheme } from '../core/styles/themes';
import GlobalStyles from '../core/styles/global';

export default function () {
  render(
    <ThemeProvider theme={popupTheme}>
      <StyleSheetManager enableVendorPrefixes>
        <GlobalStyles />
        <App />
      </StyleSheetManager>
    </ThemeProvider>,
    document.getElementById('popup'),
  );
}
