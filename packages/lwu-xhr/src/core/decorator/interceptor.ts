import { IRequest, RequestConfig, IInterceptorDecorator } from '../../types';

/**
 * 定义一个拦截器装饰器类，用来为 XMLHttpRequest 添加拦截器处理逻辑
 */
export class InterceptorDecorator implements IInterceptorDecorator  {
    // 被装饰的请求库实例
    public requestLib: IRequest;
    // 私有属性，用来存储请求拦截器函数
    private requestInterceptor: (config: any) => any;
    // 私有属性，用来存储响应拦截器函数
    private responseInterceptor: (response: any) => any;
    /**
     * 定义一个私有的超时时间属性
     * @private
     * @type {number}
     * @memberof TimeoutDecorator
     */
    private _timeout: number = 0;
    private _url = '';

    /**
     * 定义一个私有的请求配置属性
     */
    private _config: RequestConfig = {
        url: '',
        method: 'GET',
        headers: {},
        timeout: 0,
        data: {},
        responseType: 'json',
        baseURL: '',
        withCredentials: false,
        dataType: 'json',
        responseEncoding: 'utf8',
        params: {}
    };

    /**
     * 定义一个私有的超时处理函数属性
     */
    private timeoutHandler: (url: string) => any;
    // 装饰器类的构造函数
    constructor(requestLib: IRequest) {
        this.requestLib = requestLib;
        this.requestInterceptor = (config: any) => config;
        this.responseInterceptor = (response: any) => response;
        this.timeoutHandler = (url: string) => {};
    }

    /**
     * 私有方法，用来拼接请求地址和请求配置
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {RequestConfig} 返回一个请求配置对象
     * @memberof InterceptorDecorator
     */
    private mergeConfig(url: string, config?: RequestConfig): RequestConfig {
        // 定义一个请求配置对象
        let _config: RequestConfig = {
            ...this._config,
            url: url,
            ...config
        };
        // 如果请求配置中有 baseURL，拼接请求地址
        if (_config.baseURL) {
            _config.url = _config.baseURL + _config.url;
        }
        // 返回请求配置对象
        return _config;
    }

    /**
     * 重写 get 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 get 请求，并添加拦截器处理逻辑 
     * @param url - 请求地址 
     * @param config - 请求配置 
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async get(url: string, config?: RequestConfig): Promise<any> {
        // 调用拼接请求地址和请求配置的私有方法，传入请求地址和请求配置
        config = this.mergeConfig(url, config);
        // 调用请求拦截器函数，传入请求配置
        config = this.requestInterceptor(config);

        // 监听超时处理
        if (this.requestLib.getXHRInstance) {
            this.requestLib.getXHRInstance().ontimeout = () => {
                this.timeoutHandler && this.timeoutHandler(url);
            }
        }
        
        const response = await this.requestLib.get(config?.url ?? '', config);
        this._config = this.mergeConfig(url);
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
        // 调用拼接请求地址和请求配置的私有方法，传入请求地址和请求配置
        config = this.mergeConfig(url, config);
        // 调用请求拦截器函数，传入请求配置
        config = this.requestInterceptor(config);
        // 调用被装饰的post方法，传入处理后的参数
        const response = await this.requestLib.post(config?.url ?? '', config);
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
        // 调用拼接请求地址和请求配置的私有方法，传入请求地址和请求配置
        config = this.mergeConfig(url, config);
        // 调用请求拦截器函数，传入请求配置
        config = this.requestInterceptor(config);
        // 调用被装饰的put方法，传入处理后的参数
        if (!this.requestLib.put) {
            return Promise.reject('put method is not supported');
        }
        const response = await this.requestLib.put(config?.url ?? '', config);
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
        // 调用拼接请求地址和请求配置的私有方法，传入请求地址和请求配置
        config = this.mergeConfig(url, config);
        // 调用请求拦截器函数，传入请求配置
        config = this.requestInterceptor(config);
        // 调用被装饰的delete方法，传入处理后的参数
        if (!this.requestLib.delete) {
            return Promise.reject('delete method is not supported');
        }

        const response = await this.requestLib.delete(config?.url ?? '', config);
        return this.responseInterceptor(response);
        
    }

    /**
     * 重写 head 方法，接收请求地址，返回一个 Promise 对象，实现 head 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async head(url: string): Promise<any> {
        // 调用拼接请求地址和请求配置的私有方法，传入请求地址和请求配置
        let config = this.mergeConfig(url);
        // 调用请求拦截器函数，传入请求配置
        config = this.requestInterceptor({ url });
        // 调用被装饰的head方法，传入处理后的参数
        if (!this.requestLib.head) {
            return Promise.reject('head method is not supported');
        }
        const response = await this.requestLib.head(config.url ?? '', config);
        return this.responseInterceptor(response);
    }

    /**
     * 重写 options 方法，接收请求地址，返回一个 Promise 对象，实现 options 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async options(url: string): Promise<any> {
        // 调用拼接请求地址和请求配置的私有方法，传入请求地址和请求配置
        let config = this.mergeConfig(url);
        // 调用请求拦截器函数，传入请求配置
        config = this.requestInterceptor({ url });
        // 调用被装饰的options方法，传入处理后的参数
        if (!this.requestLib.options) {
            return Promise.reject('options method is not supported');
        }
        const response = await this.requestLib.options(config.url ?? '', config);
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
        // 调用拼接请求地址和请求配置的私有方法，传入请求地址和请求配置
        config = this.mergeConfig(url, config);
        // 调用请求拦截器函数，传入请求配置
        config = this.requestInterceptor(config);
        // 调用被装饰的patch方法，传入处理后的参数
        if (!this.requestLib.patch) {
            return Promise.reject('patch method is not supported');
        }
        const response = await this.requestLib.patch(config?.url ?? '', config);
        return this.responseInterceptor(response);
    }

    /**
     * 重写 request 方法，接收配置，返回一个 Promise 对象，实现 request 请求，并添加拦截器处理逻辑
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async request(config: RequestConfig): Promise<any> {
        // 调用拼接请求地址和请求配置的私有方法，传入请求地址和请求配置
        config = this.mergeConfig(config.url ?? '', config);
        // 调用请求拦截器函数，传入请求配置
        config = this.requestInterceptor(config);
        // 调用被装饰的request方法，传入处理后的参数
        if (!this.requestLib.request) {
            return Promise.reject('request method is not supported');
        }
        const response = await this.requestLib.request(config);
        return this.responseInterceptor(response);
    }

    /**
     * 公有方法，用于批量设置请求头
     * @param headers - 请求头
     * @memberof InterceptorDecorator
     */
    public setHeaders(headers: Record<any, any>) {
        // this.requestInterceptor = (config: any) => {
        //     config.headers = headers;
        //     return config;
        // }
        if (!this.requestLib.setHeaders) {
            throw new Error('setHeaders method is not supported');
        }
        this.requestLib.setHeaders(headers);
        return this;
    }

    /**
     * 公有方法，用于单次设置请求头
     * @param key - 请求头的键
     * @param value - 请求头的值
     * @memberof InterceptorDecorator
     */
    public setHeader(key: string, value: string) {
        // this.requestInterceptor = (config: any) => {
        //     config.headers[key] = value;
        //     return config;
        // }
        if (!this.requestLib.setHeader) {
            throw new Error('setHeader method is not supported');
        }
        this.requestLib.setHeader(key, value);
        return this;
    }

    /**
     * 公有方法，用于设置超时时间
     * @param timeout - 超时时间
     * @memberof InterceptorDecorator
     */
    public setTimeout(timeout: number) {
        // this.requestInterceptor = (config: any) => {
        //     config.timeout = timeout;
        //     return config;
        // }
        if (!this.requestLib.setTimeout) {
            throw new Error('setTimeout method is not supported');
        }
        this.requestLib.setTimeout && this.requestLib.setTimeout(timeout);
        return this;
    }

    /**
     * 公有方法，用于设置请求拦截器
     * @param requestInterceptor - 请求拦截器
     * @memberof InterceptorDecorator
     */
    public setRequestInterceptor(requestInterceptor: (config: any) => any) {
        this.requestInterceptor = requestInterceptor;
        return this;
    }

    /**
     * 公有方法，用于设置响应拦截器
     * @param responseInterceptor - 响应拦截器
     * @memberof InterceptorDecorator
     */
    public setResponseInterceptor(responseInterceptor: (response: any) => any) {
        this.responseInterceptor = responseInterceptor;
        return this;
    }

    /**
     * 公有方法，用于设置超时处理 
     * @param timeout - 超时时间 
     * @param timeoutHandler - 超时处理函数 
     */
    public timeout(timeout: number, timeoutHandler: (url: string) => any) {
        this._config.timeout = timeout;
        this.timeoutHandler = timeoutHandler;
        return this;
    }

    /**
     * 公有方法，用于设置请求配置
     */
    public setConfig(config: RequestConfig) {
        this._config = config;
        return this;
    }

    /**
     * 公有方法，用于获取请求配置
     */
    public getConfig(): RequestConfig {
        return this._config;
    }
}