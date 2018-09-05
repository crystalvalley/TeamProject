import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { VoiceProvider } from './contexts/VoiceRecogContext';
import App from './App';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { mainTheme } from './constance/MainTheme';
import { LoginProvider } from './contexts/LoginContext';
import { SearchProvider } from './contexts/SearchContext';
import { EmotionProvider } from './contexts/EmotionContext';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.11
 * @version : 18.09.05
 */

ReactDOM.render(

  <MuiThemeProvider theme={mainTheme}>
    <LoginProvider>
      <VoiceProvider>
        <SearchProvider>
          <EmotionProvider>
            <CssBaseline>
              <App />
            </CssBaseline>
          </EmotionProvider>
        </SearchProvider>
      </VoiceProvider>
    </LoginProvider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
