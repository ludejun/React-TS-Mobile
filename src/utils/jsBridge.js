import { isAndroidOrIOS, addParamsToUrl } from './index';

// declare global {
//   interface Window {
//     WKWebViewJavascriptBridge: any,
//     WKWVJBCallbacks: any,
//     webkit: any,
//     JsInterface: any
//   }
// }

// TODO 说明DEMO使用方法、API @ludejun
class jsBridge {
  constructor(props) {}

  init(options) {
    this.project = options.projectName || '';
    this.errorCallback = options.errorCallback || null;
    this.os = isAndroidOrIOS();
    window.__JSBridge = this; // 给window上一个实例，也可以通过这个实例调用JSBridge
    // 给原生调用
    window.invokeJSBack = () => {
      history.go(-1);
    }
  }

  // iOS真实调用bridge
  setupWKWebViewJavascriptBridge(callback) {
    if (window.WKWebViewJavascriptBridge) {
      return callback(window.WKWebViewJavascriptBridge);
    }
    if (window.WKWVJBCallbacks) {
      return window.WKWVJBCallbacks.push(callback);
    }
    window.WKWVJBCallbacks = [callback];
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.iOS_Native_InjectJavascript
    ) {
      window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
    }
  }

  // iOS JSBridge方法统一调用处
  invokeIOSEvent(eventName, data, callback) {
    this.setupWKWebViewJavascriptBridge(function(bridge) {
      try {
        bridge.callHandler(
          'ZXGNativeJavascriptHandler',
          {
            eventName, // 调用原生的方法
            body: data, // 给原生传递的数据
          },
          function(response) {
            console.log(`[JSBridge]: iOS调用原生方法${eventName}返回啦`);
            callback(response);
          }
        );
      } catch (e) {
        console.log(`[JSBridge]: iOS调用原生方法${eventName}失败`);
        this.errorCallback(e);
      }
    });
  }

  // android JSBridge方法统一调用处
  inovkeAndroidEvent(eventName, data, callback) {
    try {
      if (window.JsInterface) {
        const androidResult = window.JsInterface.ZXGNativeJavascriptHandle(
          eventName,
          JSON.stringify(data),
        );
        if (androidResult) {
          console.log(`[JSBridge]: android调用原生方法${eventName}返回啦`);
          callback();
        } else {
          console.log(`[JSBridge]: android调用的原生方法${eventName}没有`);
          this.errorCallback(e);
        }
      }
    } catch (e) {
      console.log(`[JSBridge]: android调用原生方法${eventName}失败`);
      this.errorCallback(e);
    }
  }

  // iOS调用JS代码
  iOSInvokeJS() {
    this.setupWKWebViewJavascriptBridge(function(bridge) {
      try {
        bridge.registerHandler('ZXGJavascriptHandler', function(data, responseCallback) {
          console.log('[JSBridge]: iOS原生调用方法ZXGJavascriptHandler返回啦');
          responseCallback(data);
        });
      } catch (e) {
        console.log(`[JSBridge]: iOS原生调用方法ZXGJavascriptHandler失败`);
        this.errorCallback(e);
      }
    });
  }

  // // android调用JS代码
  // androidInvokeJS()

  // 整合调用原生方法
  invokeNativeEvent(eventName, data, callback) {
    if (this.os === 'ios') {
      this.invokeIOSEvent(eventName, data, callback);
    } else if (this.os === 'android') {
      this.inovkeAndroidEvent(eventName, data, callback);
    } else {
      this.invokeIOSEvent(eventName, data, callback);
      this.inovkeAndroidEvent(eventName, data, callback);
    }
  }

  // 发起微信分享
  // data: {webpageUrl(String类型，分享URL)、title（String类型，标题）、description（String类型，副标题）、image（String类型，图片URL）}
  wxShare(data, callback) {
    this.invokeNativeEvent('WXShare', data, callback);
  }

  // 打电话
  phoneCall(phoneNumber, callback) {
    this.invokeNativeEvent('CallAndText', { type: 1, phoneNumber }, callback);
  }

  // 发短信， data中有字段phoneNumber表明是给谁发短信
  sendTextMessage(data, callback) {
    this.invokeNativeEvent('CallAndText', { type: 2, ...data }, callback);
  }

  // 返回上级页面，reload为boolean类型，是否刷新上级页面，对于单页应用返回上一页面可能退出了应用。
  // 如果单页应用内部采用整体刷新（location.href）的，可正确被原生捕捉跳转，能正确返回上一页面
  goBack(reload = false, callback) {
    this.invokeNativeEvent('GoBackPage', { reload, isHome: false }, callback);
  }

  // 隐藏导航条
  hideHeader(url, isShowBack = true) {
    if (isShowBack) {
      // 2、隐藏原生导航条，并显示返回原生返回按钮
      return addParamsToUrl(url, 'top', 'hide');
    } else {
      // 1、隐藏原生导航条，并隐藏原生返回按钮
      return addParamsToUrl(url, 'navigationBar', 'hide');
    }
  }

  // 自定义导航条
  modifyHeader(url, options = {}) {
    if (options.title) {
      url = addParamsToUrl(url, 'title', encodeURI(options.title));
    }
    if (options.backgroundColor) {
      url = addParamsToUrl(url, 'navigationBarTintColor', options.backgroundColor);
    }
    return url;
  }

  // 在导航条显示原生分享按钮
  showShareInHeader(url, clickCallback) {
    this.iOSInvokeJS(); // TODO 是否判断os
    if (clickCallback) {
      window.ZXGJavascriptHandler = clickCallback;
    }

    return addParamsToUrl(url, 'wxShareButton', 'show');
  }

  // 打开angular webview
  openAngularWebview(url, callback) {
    this.invokeNativeEvent('JumpToAngularWebView', { url }, callback);
  }

  // 关闭React Webview
  closeWebview() {
    this.invokeNativeEvent('GoBackPage', { isHome: true });
  }
}

export default new jsBridge();
