/**
 * 将数字转化为一定长的字符串，不够长的前面默认以0补齐
 * @param num 需要转化的数字
 * @param count 字符串长度
 * @param fillChat 用来补齐长度的单字符
 * @returns {string}
 */
export function num2String(num: number, count: number = 2, fillChat: string = '0'): string {
  const result = num.toString();
  if (result.length >= count) {
    return result;
  }
  return fillChat.repeat(count - result.length) + result;
}

/**
 * 判断环境是android还是iOS，不匹配的返回空字符串
 * @returns {string}
 */
export function isAndroidOrIOS() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return 'android';
  }
  if (isiOS) {
    return 'ios';
  }
  console.log('不匹配的userAgent：', u);
  return '';
}

export function addParamsToUrl(url: string, paramName: string, value?: string): string {
  if (url && paramName) {
    const paraStr = paramName + '=' + value;
    if (url.indexOf(paramName) >= 0) {
      const re = new RegExp('/(' + paramName + '=)([^&]*)/gi');
      url = url.replace(re, paraStr);
    } else {
      const idx = url.indexOf('?');
      if (idx < 0) {
        url += '?';
      } else if (idx >= 0 && idx != url.length - 1) {
        url += '&';
      }
      url += paraStr;
    }
  }
  return url;
}
