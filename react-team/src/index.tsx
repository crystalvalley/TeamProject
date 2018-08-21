import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { VoiceProvider } from './contexts/VoiceRecogContext';
import App from './App';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { mainTheme } from './constance/MainTheme';
import { LoginProvider } from './contexts/LoginContext';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.11
 * @version : 18.08.11
 */

ReactDOM.render(

  <MuiThemeProvider theme={mainTheme}>
    <LoginProvider>
      <VoiceProvider>
        <CssBaseline>
          <App />
        </CssBaseline>
      </VoiceProvider>
    </LoginProvider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
