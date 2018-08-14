import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { MainProvider } from './contexts/VoiceRecogContext';
import App from './App';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { mainTheme } from './constance/MainTheme';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.11
 * @version : 18.08.11
 */

ReactDOM.render(

  <MuiThemeProvider theme={mainTheme}>
    <MainProvider>
      <CssBaseline>
        <App />
      </CssBaseline>
    </MainProvider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
