import * as React from 'react';
import { Control } from 'react-keeper';
import JSBridge from '../../utils/jsBridge';

export default class JSBridgeDemo extends React.Component {
  wxShare() {
    JSBridge.wxShare(
      {
        webpageUrl: 'https://tyh9.loyalvalleycapital.com/',
        title: '新React首页',
        description: 'JSBridge测试中',
        image: 'https://static.loyalvalleycapital.com/upload/20201018/000012_1603017266674.jpg',
      },
      res => {
        console.log('[JSBridge-业务]: 微信分享返回', res);
      }
    );
  }

  phoneCall() {
    JSBridge.phoneCall('13671852085');
  }

  goBack() {
    JSBridge.goBack();
  }

  goBackRefresh() {
    JSBridge.goBack(true);
  }

  openAngularWebview() {
    // Control.go(JSBridge.openAngularWebview('https://tym9.loyalvalleycapital.com/'));
    window.location.href = JSBridge.openAngularWebview('https://tym9.loyalvalleycapital.com/');
  }

  hideHeader() {
    console.log(JSBridge.hideHeader('https://tyh9.loyalvalleycapital.com/'));
    // window.location.href = JSBridge.hideHeader('https://tyh9.loyalvalleycapital.com/');
    Control.go(JSBridge.hideHeader('/'));
  }
  hideHeader2() {
    // window.location.href = JSBridge.hideHeader('https://tyh9.loyalvalleycapital.com/', false);
    Control.go(JSBridge.hideHeader('/', false));
  }

  modifyHeader() {
    // window.location.href = JSBridge.modifyHeader('https://tyh9.loyalvalleycapital.com/', {
    //   title: '测试自定义导航栏',
    // });
    Control.go(JSBridge.modifyHeader('/', { title: '测试自定义导航栏' }));
  }
  modifyHeader2() {
    // window.location.href = JSBridge.modifyHeader('https://tyh9.loyalvalleycapital.com/', {
    //   title: '自定义导航栏',
    //   backgroundColor: '#ccac77',
    // });
    Control.go(
      JSBridge.modifyHeader('https://tyh9.loyalvalleycapital.com/', {
        title: '自定义导航栏',
        backgroundColor: '#ccac77',
      })
    );
  }

  showShareInHeader() {
    // window.location.href = JSBridge.showShareInHeader('https://tyh9.loyalvalleycapital.com/');
    Control.go(JSBridge.showShareInHeader('/'));
    // 在对应页面的window上添加方法给native调用，如本示例加在app.tsx
  }

  closeWebview() {
    JSBridge.closeWebview();
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          lineHeight: '100px',
        }}
      >
        <button onClick={() => this.wxShare()}>js调用微信分享</button>
        <button onClick={() => this.phoneCall()}>js调用电话</button>
        <button onClick={() => this.goBack()}>js返回上一页不刷新页面</button>
        <button onClick={() => this.goBackRefresh()}>js返回上一页刷新页面</button>
        <button onClick={() => this.openAngularWebview()}>js跳转Angular webview</button>

        <button onClick={() => this.hideHeader()}>隐藏导航条，显示返回按钮</button>
        <button onClick={() => this.hideHeader2()}>隐藏导航条，不显示返回按钮</button>
        <button onClick={() => this.modifyHeader()}>自定义导航栏，title：测试自定义导航栏</button>
        <button onClick={() => this.modifyHeader2()}>
          自定义导航栏，title：自定义导航栏，color: #ccac77
        </button>
        <button onClick={() => this.showShareInHeader()}>展示原生分享按钮</button>
        <button onClick={() => this.closeWebview()}>关闭webview，回到首页</button>
      </div>
    );
  }
}
