import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { MainProvider } from './contexts/VoiceRecogContext';
import App from './App';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.11
 * @version : 18.08.11
 */

ReactDOM.render(
  <MainProvider>
    <App/>
  </MainProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
