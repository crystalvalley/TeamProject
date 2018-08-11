import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MainProvider } from './contexts/VoiceRecogContext';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.11
 * @version : 18.08.11
 */

ReactDOM.render(
  <MainProvider>
    <App />
  </MainProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
