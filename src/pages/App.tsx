import * as React from 'react';
import { CacheLink } from 'react-keeper';
import Count from './components/Count';
import logo from './logo.svg';
import './App.less';

interface IAppProps {
  count?: number;
  increment?: () => void;
  incrementAsync?: () => void;
}
declare global {
  interface Window {
    WKWebViewJavascriptBridge: any,
    WKWVJBCallbacks: any,
    webkit: any
  }
}

export default class App extends React.Component<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
  }

  componentDidMount() {
    // JSBridge方法统一调用处
    function setupWKWebViewJavascriptBridge(callback: any) {
      if (window.WKWebViewJavascriptBridge) { return callback(window.WKWebViewJavascriptBridge); }
      if (window.WKWVJBCallbacks) { return window.WKWVJBCallbacks.push(callback); }
      window.WKWVJBCallbacks = [callback];
      if (window.webkit) {
        window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
      }
    }

    setupWKWebViewJavascriptBridge(function (bridge: any) {
      var uniqueId = 1;
      function log(message: string, data?: any, type?: string) {
        var log = document.getElementById('log');
        var el = document.createElement('div');
        el.className = type == 'native' ? 'logLine_Native' : 'logLine_JS';
        el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data);
        if (log) {
          if (log.children.length) {
            log.insertBefore(el, log.children[0])
          } else {
            log.appendChild(el)
          }
        }
      }
      //APP调用JS
      bridge.registerHandler('ZXGJavascriptHandler', function (data: any, responseCallback: any) {
        log('iOS called testJavascriptHandler with', data, 'native')
        var responseData = { 'Javascript Says': 'Right back atcha!' }
        log('JS responding with', responseData, 'native')
        responseCallback(responseData)
      })

      document.body.appendChild(document.createElement('br'))

      var callbackButton = (document.getElementById('buttons') as Element).appendChild(document.createElement('button'))
      callbackButton.innerHTML = 'js调用原生APP';
      //JS调用APP
      callbackButton.onclick = function (e) {
        e.preventDefault();
        log('JS calling handler "testiOSCallback"');
        bridge.callHandler('ZXGNativeJavascriptHandler', { 'foo': 'bar' }, function (response: any) {
          log('JS got response', response, 'js');
        });
      }
    })
  }

  render() {
    const { increment, incrementAsync } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>计数中：{this.props.count}</p>
          <div id='buttons'></div>
          <div id='log'></div>

          {/* <Count onAddClick={increment} onAddAsyncClick={incrementAsync} /> */}
          <CacheLink to="/404"></CacheLink>
        </header>
      </div>
    );
  }
}
