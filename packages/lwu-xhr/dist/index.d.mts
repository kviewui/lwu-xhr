type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
/**
 * 请求的回调参数
 */
interface ResolveCallback {
    data: object;
    statusCode?: number | string;
    statusText?: string;
    headers?: object;
    request?: XMLHttpRequest;
}
/**
 * 定义拦截器接口，声明请求前和请求后的处理方法
 */
interface IInterceptor {
    request: (config: object) => any;
    response: (data: any) => any;
}
/**
 * 定义请求接口，声明请求方法
 * @export
 * @interface IRequest
 */
interface IRequest {
    /**
     * 发送 get 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof IRequest
     */
    get(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 发送 post 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof IRequest
     */
    post(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 发送 put 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof IRequest
     */
    put?: (url: string, config?: RequestConfig) => Promise<any>;
    /**
     * 发送 delete 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof IRequest
     */
    delete?: (url: string, config?: RequestConfig) => Promise<any>;
    /**
     * 发送 head 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof IRequest
     */
    head?: (url: string, config?: RequestConfig) => Promise<any>;
    /**
     * 发送 options 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof IRequest
     */
    options?: (url: string, config?: RequestConfig) => Promise<any>;
    /**
     * 发送 patch 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof IRequest
     */
    patch?: (url: string, config?: RequestConfig) => Promise<any>;
    /**
     * 发送请求
     * @param config - 请求配置
     */
    request?: (config: RequestConfig) => Promise<any>;
    /**
     * 设置请求头
     * @param key - 请求头的 key
     * @param value - 请求头的 value
     */
    setHeader?: (key: string, value: string) => this;
    /**
     * 设置请求头
     * @param headers - 请求头对象
     */
    setHeaders?: (headers: Record<string, string>) => this;
    /**
     * 设置请求超时时间
     * @param time - 超时时间
     */
    setTimeout?: (time: number) => this;
    /**
     * 获取 XMLHttpRequest 实例
     */
    getXHRInstance?: () => XMLHttpRequest;
}
/**
 * 定义请求装饰器基础接口，继承 IRequest 接口
 * @export
 * @interface Decorator
 * @extends {IRequest}
 */
interface Decorator extends IRequest {
    requestLib?: IRequest;
}
/**
 * 定义拦截器装饰器接口，继承 Decorator 接口
 * @export
 * @interface InterceptorDecorator
 * @extends {Decorator}
 */
interface IInterceptorDecorator extends Decorator {
    setRequestInterceptor?: (requestInterceptor: (config: RequestConfig) => RequestConfig) => this;
    setResponseInterceptor?: (responseInterceptor: (response: any) => any) => this;
    setConfig?: (config: RequestConfig) => this;
    getConfig?: () => RequestConfig;
    timeout?: (timeout: number, timeoutHandler: (url: string) => any) => this;
}
/**
 * 定义错误处理装饰器接口，继承 Decorator 接口
 * @export
 * @interface ErrorHandlerDecorator
 * @extends {Decorator}
 */
interface IErrorHandlerDecorator extends IInterceptorDecorator {
    setErrorHandler?: (errorHandler: (error: any) => void) => void;
}
/**
 * 定义超时处理装饰器接口，继承 Decorator 接口
 * @export
 * @interface TimeoutDecorator
 * @extends {Decorator}
 */
interface ITimeoutDecorator extends IErrorHandlerDecorator {
    timeout?: (timeout: number, timeoutHandler: (url: string) => any) => this;
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
    headers?: Record<any, any>;
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
 * @description 响应配置
 */
interface ResponseConfig {
    /**
     * @description 响应的数据
     */
    data: any;
    /**
     * @description 响应状态码
     */
    status: number;
    /**
     * @description 响应状态信息
     */
    statusText: string;
    /**
     * @description 响应头
     */
    headers: any;
    /**
     * @description 请求配置
     */
    config: RequestConfig;
    /**
     * @description 请求的 XMLHttpRequest 实例
     */
    request: XMLHttpRequest;
}

/**
 * 定义一个错误处理装饰器类，用来为 XMLHttpRequest 添加错误处理逻辑
 */
declare class ErrorHandlerDecorator implements IErrorHandlerDecorator {
    /**
     * 定义一个私有的错误处理函数属性
     */
    private errorHandler;
    requestLib: IRequest;
    /**
     * 定义一个公共的构造函数，接收一个 IRequest 接口的实例，一个错误处理函数，实现错误处理装饰器类的构造函数
     * @param request - IRequest 接口的实例
     * @param errorHandler - 错误处理函数
     */
    constructor(requestLib: IRequest);
    /**
     * 重写 get 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 get 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    get(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 post 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 post 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    post(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 put 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 put 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    put(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 delete 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 delete 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    delete(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 head 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 head 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    head(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 options 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 options 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    options(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 patch 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 patch 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    patch(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 request 方法，接收请求配置，返回一个 Promise 对象，实现 request 请求，并添加错误处理逻辑
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    request(config: RequestConfig): Promise<any>;
    /**
     * 定义一个公共的 setErrorHandler 方法，接收一个错误处理函数，用来设置错误处理函数
     * @param errorHandler - 错误处理函数
     * @memberof ErrorHandlerDecorator
     */
    setErrorHandler(errorHandler: (error: any) => void): void;
    /**
     * 公有方法，用来批量设置请求头
     * @param headers - 请求头对象
     * @memberof ErrorHandlerDecorator
     */
    setHeaders(headers: Record<any, any>): this;
    /**
     * 公有方法，用来设置单个请求头
     * @param key - 请求头的 key
     * @param value - 请求头的 value
     * @memberof ErrorHandlerDecorator
     */
    setHeader(key: string, value: string): this;
    /**
     * 公有方法，用来设置超时时间
     * @param timeout - 超时时间
     * @memberof ErrorHandlerDecorator
     */
    setTimeout(timeout: number): this;
}

/**
 * 定义一个拦截器装饰器类，用来为 XMLHttpRequest 添加拦截器处理逻辑
 */
declare class InterceptorDecorator implements IInterceptorDecorator {
    requestLib: IRequest;
    private requestInterceptor;
    private responseInterceptor;
    /**
     * 定义一个私有的超时时间属性
     * @private
     * @type {number}
     * @memberof TimeoutDecorator
     */
    private _timeout;
    private _url;
    /**
     * 定义一个私有的请求配置属性
     */
    private _config;
    /**
     * 定义一个私有的超时处理函数属性
     */
    private timeoutHandler;
    constructor(requestLib: IRequest);
    /**
     * 私有方法，用来拼接请求地址和请求配置
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {RequestConfig} 返回一个请求配置对象
     * @memberof InterceptorDecorator
     */
    private mergeConfig;
    /**
     * 重写 get 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 get 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    get(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 post 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 post 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    post(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 put 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 put 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    put(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 delete 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 delete 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    delete(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 head 方法，接收请求地址，返回一个 Promise 对象，实现 head 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    head(url: string): Promise<any>;
    /**
     * 重写 options 方法，接收请求地址，返回一个 Promise 对象，实现 options 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    options(url: string): Promise<any>;
    /**
     * 重写 patch 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 request 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    patch(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 request 方法，接收配置，返回一个 Promise 对象，实现 request 请求，并添加拦截器处理逻辑
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    request(config: RequestConfig): Promise<any>;
    /**
     * 公有方法，用于批量设置请求头
     * @param headers - 请求头
     * @memberof InterceptorDecorator
     */
    setHeaders(headers: Record<any, any>): this;
    /**
     * 公有方法，用于单次设置请求头
     * @param key - 请求头的键
     * @param value - 请求头的值
     * @memberof InterceptorDecorator
     */
    setHeader(key: string, value: string): this;
    /**
     * 公有方法，用于设置超时时间
     * @param timeout - 超时时间
     * @memberof InterceptorDecorator
     */
    setTimeout(timeout: number): this;
    /**
     * 公有方法，用于设置请求拦截器
     * @param requestInterceptor - 请求拦截器
     * @memberof InterceptorDecorator
     */
    setRequestInterceptor(requestInterceptor: (config: any) => any): this;
    /**
     * 公有方法，用于设置响应拦截器
     * @param responseInterceptor - 响应拦截器
     * @memberof InterceptorDecorator
     */
    setResponseInterceptor(responseInterceptor: (response: any) => any): this;
    /**
     * 公有方法，用于设置超时处理
     * @param timeout - 超时时间
     * @param timeoutHandler - 超时处理函数
     */
    timeout(timeout: number, timeoutHandler: (url: string) => any): this;
    /**
     * 公有方法，用于设置请求配置
     */
    setConfig(config: RequestConfig): this;
    /**
     * 公有方法，用于获取请求配置
     */
    getConfig(): RequestConfig;
}

/**
 * 定义一个超时处理装饰器类，继承自 RequestInterceptor 类
 */
declare class TimeoutDecorator implements ITimeoutDecorator {
    requestLib: IInterceptorDecorator;
    /**
     * 定义一个私有的超时时间属性
     * @private
     * @type {number}
     * @memberof TimeoutDecorator
     */
    private _timeout;
    /**
     * 定义一个私有的超时处理函数属性
     */
    private timeoutHandler;
    /**
     * 定义一个公共的构造函数，接收一个 IRequest 接口的实例，一个超时时间，一个超时处理函数，实现超时处理装饰器类的构造函数
     * @param request - IRequest 接口的实例
     * @param timeout - 超时时间
     * @param timeoutHandler - 超时处理函数
     */
    constructor(requestLib: IInterceptorDecorator);
    /**
     * 重写 get 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 get 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    get(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 post 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 post 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    post(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 put 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 put 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    put(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 delete 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 delete 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    delete(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 head 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 head 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    head(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 options 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 options 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    options(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 request 方法，接收请求配置，返回一个 Promise 对象，实现 patch 请求，并添加超时处理逻辑
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    request(config: RequestConfig): Promise<any>;
    /**
     * 重写 patch 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 patch 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    patch(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 公有方法，用来批量设置请求头
     * @param headers - 请求头对象
     * @memberof ErrorHandlerDecorator
     */
    setHeaders(headers: Record<any, any>): this;
    /**
     * 公有方法，用来设置单个请求头
     * @param key - 请求头的 key
     * @param value - 请求头的 value
     * @memberof ErrorHandlerDecorator
     */
    setHeader(key: string, value: string): this;
    /**
     * 公有方法，用来设置超时处理
     * @param timeout - 超时时间
     * @param timeoutHandler - 超时处理函数
     * @memberof ErrorHandlerDecorator
     */
    timeout(timeout: number, timeoutHandler: (url: string) => any): this;
}

/**
 * 定义一个请求库类，实现 IRequest 接口
 * @export
 * @class RequestLibraryImpl
 * @implements {IRequest}
 * @example
 * ```ts
 * import { RequestLibraryImpl } from 'lwu-xhr';
 *
 * const request = new RequestLibraryImpl();
 *
 * request.get('https://www.baidu.com').then((response) => {});
 * request.post('https://www.baidu.com', { name: 'lwu' }).then((response) => {});
 * request.put('https://www.baidu.com', { name: 'lwu' }).then((response) => {});
 * request.delete('https://www.baidu.com').then((response) => {});
 * request.head('https://www.baidu.com').then((response) => {});
 * request.options('https://www.baidu.com').then((response) => {});
 * ```
 */
declare class RequestLibraryImpl implements IRequest {
    /**
     * 定义一个私有的属性，用来存储 XMLHttpRequest 实例
     */
    private xhr;
    /**
     * 定义一个私有的属性，用来存储请求头对象
     */
    private headers;
    /**
     * 定义一个私有的属性，用来存储请求超时时间
     */
    private timeout;
    /**
     * 定义一个私有的属性，用来存储请求队列
     */
    private requestQueue;
    /**
     * 定义一个私有的属性，用来存储当前请求
     */
    private currentRequest;
    private pubSub;
    constructor(xhr: XMLHttpRequest);
    /**
     * 定义一个私有的方法，用来处理请求队列
     */
    private processQueue;
    private addRequestToQueue;
    /**
     * 重写 get 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 get 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    get(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 post 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 post 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    post(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 put 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 put 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    put(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 delete 方法，接收请求地址，返回一个 Promise 对象，实现 delete 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    delete(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 head 方法，接收请求地址，返回一个 Promise 对象，实现 head 请求
     * @param url - 请求地址
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    head(url: string): Promise<any>;
    /**
     * 重写 options 方法，接收请求地址，返回一个 Promise 对象，实现 options 请求
     * @param url - 请求地址
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    options(url: string): Promise<any>;
    /**
     * 重写 patch 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 patch 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    patch(url: string, config?: RequestConfig): Promise<any>;
    /**
     * 重写 request 方法，接收请求配置，返回一个 Promise 对象，实现请求
     * @param config - 请求配置
     * @param config.method - 请求方法
     * @param config.url - 请求地址
     * @param config.data - 请求参数
     * @param config.headers - 请求头
     * @param config.timeout - 超时时间
     * @param config.responseType - 响应类型
     * @param config.withCredentials - 是否携带凭证
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    request(config: RequestConfig): Promise<any>;
    /**
     * 重写 setHeader 方法，接收请求头的键和值，设置请求头
     * @param key - 请求头的键
     * @param value - 请求头的值
     * @memberof RequestLibraryImpl
     */
    setHeader(key: string, value: string): this;
    /**
     * 重写 setTimeout 方法，接收超时时间，设置超时时间
     * @param timeout - 超时时间
     * @memberof RequestLibraryImpl
     */
    setTimeout(timeout: number): this;
    /**
     * 重写 setHeaders 方法，接收请求头对象，设置请求头
     * @param headers - 请求头对象
     * @memberof RequestLibraryImpl
     */
    setHeaders(headers: Record<string, string>): this;
    /**
     * 重写 getXHRInstance 方法，返回 XMLHttpRequest 实例
     * @returns {XMLHttpRequest}
     * @memberof RequestLibraryImpl
     */
    getXHRInstance(): XMLHttpRequest;
    /**
     * 定义一个私有的方法，用来设置所有的请求头
     * @private
     * @memberof RequestLibraryImpl
     */
    private _setHeaders;
}

/**
 * 定义一个单例类，用来创建和共享 XMLHttpRequest 实例
 * @export
 * @class Singleton
 */
declare class Singleton {
    /**
     * 静态私有属性，用来存储 XMLHttpRequest 实例
     * @private
     * @static
     * @type {XMLHttpRequest}
     * @memberof Singleton
     */
    private static instance;
    /**
     * 私有的 XMLHttpRequest 实例
     * @private
     * @type {XMLHttpRequest}
     * @memberof Singleton
     */
    private xhr;
    /**
     * 私有的构造函数，防止外部创建实例
     * @private
     * @memberof Singleton
     */
    private constructor();
    /**
     * 定义一个公共的静态方法，用来获取 XMLHttpRequest 实例，如果实例不存在，则创建一个新的实例
     * @static
     * @returns {XMLHttpRequest}
     * @memberof Singleton
     */
    static getInstance(): Singleton;
    /**
     * 定义一个公共的方法，用来获取 XMLHttpRequest 实例
     * @returns {XMLHttpRequest}
     * @memberof Singleton
     */
    getXHR(): XMLHttpRequest;
}

/**
 * 工厂函数，用来创建一个请求库实例
 * @param options - 配置项
 * @param options.useInterceptor - 是否使用拦截器
 * @param options.useTimeout - 是否使用超时处理
 * @param options.useErrorHandler - 是否使用错误处理
 * @returns {IRequest | IErrorHandlerDecorator | IInterceptorDecorator | ITimeoutDecorator} 返回一个请求库实例
 * @export
 * @example
 * ```ts
 * // 引入 create 函数
 * import { create } from 'lwu-xhr';
 *
 * // 创建一个请求库实例
 * const request = create({
 *  useInterceptor: true,
 *  useTimeout: true,
 *  useErrorHandler: true
 * });
 *
 * // 使用拦截器
 * request.requestInterceptor((config) => {
 *  // 在请求前做一些处理
 *  return config;
 * });
 *
 * // 使用超时处理
 * request.timeout(1000, (url) => {
 *  // 超时后的处理逻辑
 * });
 *
 * // 使用错误处理
 * request.errorHandler((error) => {
 *  // 错误处理逻辑
 * });
 *
 * request.get('https://www.baidu.com').then((response) => {});
 * request.post('https://www.baidu.com', { name: 'lwu' }).then((response) => {});
 * request.put('https://www.baidu.com', { name: 'lwu' }).then((response) => {});
 * request.delete('https://www.baidu.com').then((response) => {});
 * request.head('https://www.baidu.com').then((response) => {});
 * request.options('https://www.baidu.com').then((response) => {});
 * request.request({ url: 'https://www.baidu.com' }).then((response) => {});
 * ```
 */
declare function create(options?: {
    /**
     * @description 是否使用拦截器
     */
    useInterceptor?: boolean;
    /**
     * @description 是否使用超时处理
     */
    useTimeout?: boolean;
    /**
     * @description 是否使用错误处理
     */
    useErrorHandler?: boolean;
    /**
     * @description 自定义装饰器
     */
    decorator?: any[];
}): IInterceptorDecorator | IRequest;

export { Config, Decorator, ErrorHandlerDecorator, IErrorHandlerDecorator, IInterceptor, IInterceptorDecorator, IRequest, ITimeoutDecorator, InterceptorDecorator, RequestConfig, RequestLibraryImpl, RequestMethod, ResolveCallback, ResponseConfig, Singleton, TimeoutDecorator, create };
