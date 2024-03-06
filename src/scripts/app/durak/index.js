import { render } from 'preact'
import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager, ThemeProvider } from 'styled-components'

import App from './components/App'
import GlobalStyles from '../core/styles/global'
import { durakTheme } from '../core/styles/themes'

function shouldForwardProp(propName, target) {
  if (typeof target === 'string') {
    return isPropValid(propName)
  }
  return true
}

export default function () {
  const app = document.createElement('div')
  app.id = 'durak-helper-root'
  app.attachShadow({ mode: 'open' })

  document.body.appendChild(app)

  render(
    <ThemeProvider theme={durakTheme}>
      <StyleSheetManager
        shouldForwardProp={shouldForwardProp}
        enableVendorPrefixes
        target={document.getElementById(app.id).shadowRoot}
      >
        <GlobalStyles />
        <App />
      </StyleSheetManager>
    </ThemeProvider>,
    app.shadowRoot
  )
}
