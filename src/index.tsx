import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import TranscriptionStore from './stores/transcriptionStore';
import SlideStore from './stores/slideStore';

// const transcriptionStore = new TranscriptionStore();

ReactDOM.render(
  <Provider transcriptionStore={TranscriptionStore} slideStore={SlideStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
