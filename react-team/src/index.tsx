import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { mainTheme } from './constance/MainTheme';
import { LoginProvider } from './contexts/LoginContext';
import { SearchProvider } from './contexts/SearchContext';
import { EmotionProvider } from './contexts/EmotionContext';
import { FavoriteProvider } from './contexts/FavoriteContext';
import NetworkProvider from './contexts/NetworkContext';
import { BrowserRouter } from 'react-router-dom';
import SaveBoardContextProvider from './contexts/SaveBoardContext';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.11
 * @version : 18.09.05
 */

ReactDOM.render(

  <BrowserRouter>
    <MuiThemeProvider theme={mainTheme}>
      <LoginProvider>
        <NetworkProvider>
          <SearchProvider>
            <EmotionProvider>
              <FavoriteProvider>
                <SaveBoardContextProvider>
                  <CssBaseline>
                    <App />
                  </CssBaseline>
                </SaveBoardContextProvider>
              </FavoriteProvider>
            </EmotionProvider>
          </SearchProvider>
        </NetworkProvider>
      </LoginProvider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
