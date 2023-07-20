import type { RequestMethod } from './shared';

/**
 * @description 实例配置
 */
export interface Config {
    /**
     * @description 请求的根域名
     */
    baseURL: string;
    /**
     * @description 超时时间
     */
    timeout?: number;
    /**
     * @description 请求头
     */
    headers?: any;
    /**
     * @description 请求方法
     */
    method?: RequestMethod;
    /**
     * @description 跨域请求时是否需要使用凭证
     */
    withCredentials?: boolean;
    /**
     * @description 响应的数据类型，默认为json
     */
    dataType?: string;
    /**
     * @description 响应的数据类型
     */
    responseType?: XMLHttpRequestResponseType;
    /**
     * @description 响应的数据编码
     */
    responseEncoding?: string;
    /**
     * @description xsrf token 的值，被用作 cookie 的名称
     */
    xsrfCookieName?: string;
    /**
     * @description 带有 xsrf token 值的http 请求头名称
     */
    xsrfHeaderName?: string;
    /**
     * @description node.js中允许的HTTP响应内容的最大字节数
     */
    maxContentLength?: number;
    /**
     * @description node环境中定义允许的http请求内容的最大字节数
     */
    maxBodyLength?: number;
    /**
     * @description 自定义请求拦截
     */
    before?: Function;
    /**
     * @description 自定义响应拦截
     */
    after?: Function;
};

/**
 * @description 请求配置
 */
export interface RequestConfig extends Config {
    /**
     * @description 请求的服务器URL 
     */
    url?: string;
    /**
     * @description 请求的url参数
     */
    params?: object | URLSearchParams;
    /**
     * @description 请求的数据
     */
    data?: object;
};