import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Routes from './routes';
import Storage from './utils/Storage';
import configs from './configs';
import * as serviceWorker from './serviceWorker';

Storage.setNamespace(configs.name);

ReactDOM.render(
  <Routes />,
  document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
