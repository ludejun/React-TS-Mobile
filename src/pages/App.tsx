import * as React from 'react';
import { CacheLink } from 'react-keeper';
import JSBridge from '../utils/jsBridge';
import Count from './components/Count';
import './App.less';
import { apiURL } from '../configs/api';

interface IAppProps {
  count?: number;
  increment?: () => void;
  incrementAsync?: () => void;
}
declare global {
  interface Window {
    WKWebViewJavascriptBridge: any;
    WKWVJBCallbacks: any;
    webkit: any;
    JsInterface: any;
    ZXGJavascriptHandler: any;
  }
}

export default class App extends React.Component<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
    console.log(apiURL('login'));
  }

  componentDidMount() {
    // 在对应页面的window上添加方法给native调用
    if (window.location.href.indexOf('wxShareButton=show')) {
      window.ZXGJavascriptHandler = () => {
        JSBridge.wxShare(
          {
            webpageUrl: 'https://tyh9.loyalvalleycapital.com/',
            title: '新React首页',
            description: 'JSBridge测试中',
            image: 'https://static.loyalvalleycapital.com/upload/20201018/000012_1603017266674.jpg',
          },
          (res: any) => {
            console.log('[JSBridge-业务]: 微信分享返回', res);
          }
        );
      };
    }
  }

  render() {
    const { increment, incrementAsync } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <CacheLink to="/jsbridgedemo">跳转jsbridgedemo</CacheLink>
          </div>
          <div id="log"></div>

          {/* <Count onAddClick={increment} onAddAsyncClick={incrementAsync} /> */}
          <CacheLink to="/404"></CacheLink>
        </header>
      </div>
    );
  }
}
