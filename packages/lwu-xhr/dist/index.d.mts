type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
/**
 * @description 请求的回调参数
 */
interface ResolveCallback {
    data: object;
    statusCode?: number | string;
    statusText?: string;
    headers?: object;
    request?: XMLHttpRequest;
}

/**
 * @description 实例配置
 */
interface Config {
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
}
/**
 * @description 请求配置
 */
interface RequestConfig extends Config {
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
}

/**
 * @description 封装 XMLHttpRequest
 */
declare class LwuXHRLib {
    constructor();
    /**
     * @description 拦截器
     */
    interceptors: {
        /**
         * @description 请求拦截器
         */
        request: {
            use: (beforeRequest: (config: RequestConfig) => Config, error: (error: any) => Promise<unknown>, xhr: LwuXHRLib) => void;
        };
        /**
         * @description 响应拦截器
         */
        response: {
            use: (response: any) => void;
        };
    };
    private response;
    private error;
    private success;
    /**
     * @description 请求拦截器请求前执行的函数
     * @param func 请求前执行的函数
     */
    private beforeRequest;
    /**
     * @description 请求拦截器请求错误执行的函数
     * @param func 请求错误执行的函数
     */
    private requestError;
    /**
     * @description 响应拦截器响应后执行的函数
     * @param func 响应后执行的函数
     */
    private responseCall;
    /**
     * @description 响应拦截器响应错误执行的函数
     * @param func 响应错误执行的函数
     */
    private responseError;
    private xhr;
    /**
     * @description 默认配置
     */
    defaults: Config;
    /**
     * @description 默认请求配置
     */
    private defaultsReqConfig;
    /**
     * @description 请求配置
     */
    private reqConfig;
    private buildSendData;
    /**
     * @description 请求后执行的函数
     */
    private afterRequest;
    /**
     * @description 发送请求
     * @param url 请求 URL
     * @param method 请求方法
     */
    private commonRequest;
    /**
     * @description 发送 get 请求
     * @param url 请求的 url
     * @param config 请求的配置
     */
    get(url: string, config?: Config): Promise<ResolveCallback>;
    /**
     * @description 发送 post 请求
     * @param url 请求的 url
     * @param config 请求的配置
     */
    post(url: string, config?: Config): Promise<ResolveCallback>;
    /**
     * @description 发送 put 请求
     * @param url 请求的 url
     * @param config 请求的配置
     */
    put(url: string, config?: Config): Promise<ResolveCallback>;
    /**
     * @description 发送 delete 请求
     * @param url 请求的 url
     * @param config 请求的配置
     */
    delete(url: string, config?: Config): Promise<ResolveCallback>;
    /**
     * @description 发送请求
     * @param config 请求的配置
     */
    request(config: Config): Promise<ResolveCallback>;
    /**
     * @description 发送 head 请求
     * @param url 请求的 url
     * @param config 请求的配置
     */
    head(url: string, config?: Config): Promise<ResolveCallback>;
    /**
     * @description 发送 options 请求
     * @param url 请求的 url
     * @param config 请求的配置
     */
    options(url: string, config?: Config): Promise<ResolveCallback>;
    /**
     * @description 发送 patch 请求
     * @param url 请求的 url
     * @param config 请求的配置
     */
    patch(url: string, config?: Config): Promise<ResolveCallback>;
    /**
     * @description 中断请求
     */
    abort(): void;
    /**
     * @description 创建一个实例
     * @param config 实例的配置
     */
    create(config: Config): this;
    /**
     * @description 设置请求配置
     * @param config 请求配置
     */
    setConfig(config: RequestConfig): this;
    /**
     * @description 获取请求配置
     */
    getConfig(): RequestConfig;
    /**
     * @description 获取请求的根域名
     */
    getBaseURL(): string;
    /**
     * @description 设置请求头
     */
    setHeader(headers: object): this;
}
declare const LwuXHR: LwuXHRLib;

export { Config, LwuXHR, RequestConfig, RequestMethod, ResolveCallback };
