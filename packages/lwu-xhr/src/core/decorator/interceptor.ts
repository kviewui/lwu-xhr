import { IRequest, Decorator, RequestConfig } from '../../types';

/**
 * 定义一个拦截器装饰器类，用来为 XMLHttpRequest 添加拦截器处理逻辑
 */
export class InterceptorDecorator implements Decorator {
    // 被装饰的请求库实例
    public requestLib: IRequest;
    // 私有属性，用来存储请求拦截器函数
    private requestInterceptor: (config: any) => any;
    // 私有属性，用来存储响应拦截器函数
    private responseInterceptor: (response: any) => any;
    // 装饰器类的构造函数
    constructor(requestLib: IRequest) {
        this.requestLib = requestLib;
        this.requestInterceptor = (config: any) => config;
        this.responseInterceptor = (response: any) => response;
    }

    /**
     * 重写 get 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 get 请求，并添加拦截器处理逻辑 
     * @param url - 请求地址 
     * @param config - 请求配置 
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async get(url: string, config?: RequestConfig): Promise<any> {
        // 调用请求拦截器函数，传入请求配置
        let _config = this.requestInterceptor(config);
        // 调用被装饰的get方法，传入处理后的参数
        const response = await this.requestLib.get(_config.url, _config);
        return this.responseInterceptor(response);
    }

    /**
     * 重写 post 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 post 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async post(url: string, config?: RequestConfig): Promise<any> {
        // 调用请求拦截器函数，传入请求配置
        let _config = this.requestInterceptor(config);
        // 调用被装饰的post方法，传入处理后的参数
        const response = await this.requestLib.post(_config.url, _config);
        return this.responseInterceptor(response);
    }

    /**
     * 重写 put 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 put 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async put(url: string, config?: RequestConfig): Promise<any> {
        // 调用请求拦截器函数，传入请求配置
        let _config = this.requestInterceptor(config);
        // 调用被装饰的put方法，传入处理后的参数
        const response = await this.requestLib.put(_config.url, _config);
        return this.responseInterceptor(response);
    }

    /**
     * 重写 delete 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 delete 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async delete(url: string, config?: RequestConfig): Promise<any> {
        // 调用请求拦截器函数，传入请求配置
        let _config = this.requestInterceptor(config);
        // 调用被装饰的delete方法，传入处理后的参数
        const response = await this.requestLib.delete(_config.url, _config);
        return this.responseInterceptor(response);
    }

    /**
     * 重写 head 方法，接收请求地址，返回一个 Promise 对象，实现 head 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async head(url: string): Promise<any> {
        // 调用请求拦截器函数，传入请求配置
        let _config = this.requestInterceptor({ url });
        // 调用被装饰的head方法，传入处理后的参数
        const response = await this.requestLib.head(_config.url, _config);
        return this.responseInterceptor(response);
    }

    /**
     * 重写 options 方法，接收请求地址，返回一个 Promise 对象，实现 options 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async options(url: string): Promise<any> {
        // 调用请求拦截器函数，传入请求配置
        let _config = this.requestInterceptor({ url });
        // 调用被装饰的options方法，传入处理后的参数
        const response = await this.requestLib.options(_config.url, _config);
        return this.responseInterceptor(response);
    }

    /**
     * 重写 patch 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 request 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async patch(url: string, config?: RequestConfig): Promise<any> {
        // 调用请求拦截器函数，传入请求配置
        let _config = this.requestInterceptor(config);
        // 调用被装饰的patch方法，传入处理后的参数
        const response = await this.requestLib.patch(_config.url, _config);
        return this.responseInterceptor(response);
    }

    /**
     * 重写 request 方法，接收配置，返回一个 Promise 对象，实现 request 请求，并添加拦截器处理逻辑
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async request(config: RequestConfig): Promise<any> {
        // 调用请求拦截器函数，传入请求配置
        let _config = this.requestInterceptor(config);
        // 调用被装饰的request方法，传入处理后的参数
        const response = await this.requestLib.request(_config);
        return this.responseInterceptor(response);
    }

    /**
     * 公有方法，用于批量设置请求头
     * @param headers - 请求头
     * @memberof InterceptorDecorator
     */
    public setHeaders(headers: object): void {
        // this.requestInterceptor = (config: any) => {
        //     config.headers = headers;
        //     return config;
        // }
        this.requestLib.setHeaders(headers);
    }

    /**
     * 公有方法，用于单次设置请求头
     * @param key - 请求头的键
     * @param value - 请求头的值
     * @memberof InterceptorDecorator
     */
    public setHeader(key: string, value: string): void {
        // this.requestInterceptor = (config: any) => {
        //     config.headers[key] = value;
        //     return config;
        // }
        this.requestLib.setHeader(key, value);
    }

    /**
     * 公有方法，用于设置超时时间
     * @param timeout - 超时时间
     * @memberof InterceptorDecorator
     */
    public setTimeout(timeout: number): void {
        // this.requestInterceptor = (config: any) => {
        //     config.timeout = timeout;
        //     return config;
        // }
        this.requestLib.setTimeout && this.requestLib.setTimeout(timeout);
    }

    /**
     * 公有方法，用于设置请求拦截器
     * @param requestInterceptor - 请求拦截器
     * @memberof InterceptorDecorator
     */
    public setRequestInterceptor(requestInterceptor: (config: any) => any): void {
        this.requestInterceptor = requestInterceptor;
    }

    /**
     * 公有方法，用于设置响应拦截器
     * @param responseInterceptor - 响应拦截器
     * @memberof InterceptorDecorator
     */
    public setResponseInterceptor(responseInterceptor: (response: any) => any): void {
        this.responseInterceptor = responseInterceptor;
    }
}