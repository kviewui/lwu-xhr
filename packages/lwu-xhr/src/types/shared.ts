import { RequestConfig } from "./config";

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';

/**
 * 请求的回调参数
 */
export interface ResolveCallback {
    data: object;
    statusCode?: number | string;
    statusText?: string;
    headers?: object;
    request?: XMLHttpRequest;
};

/**
 * 定义拦截器接口，声明请求前和请求后的处理方法
 */
export interface IInterceptor {
    request: (config: object) => any; // 请求前的处理方法，可以修改或返回请求配置
    response: (data: any) => any; // 请求后的处理方法，可以修改或返回响应数据
}

/**
 * 定义请求接口，声明请求方法
 * @export
 * @interface IRequest
 */
export interface IRequest {
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
export interface Decorator extends IRequest {
    requestLib?: IRequest;
}

/**
 * 定义拦截器装饰器接口，继承 Decorator 接口
 * @export
 * @interface InterceptorDecorator
 * @extends {Decorator}
 */
export interface IInterceptorDecorator extends Decorator {
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
export interface IErrorHandlerDecorator extends IInterceptorDecorator {
    setErrorHandler?: (errorHandler: (error: any) => void) => void;
}

/**
 * 定义超时处理装饰器接口，继承 Decorator 接口
 * @export
 * @interface TimeoutDecorator
 * @extends {Decorator}
 */
export interface ITimeoutDecorator extends IErrorHandlerDecorator {
    timeout?: (timeout: number, timeoutHandler: (url: string) => any) => this;
}