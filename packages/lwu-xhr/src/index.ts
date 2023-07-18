import type { Config, RequestConfig, ResolveCallback } from './types';
import { objToQueryString } from './tools/';

/**
 * @description 封装 XMLHttpRequest
 */
class LwuXHR {
    /**
     * @description 拦截器
     */
    public interceptors = {
        /**
         * @description 请求拦截器
         */
        request: {
            use: (beforeRequest: (config: Config) => Config, error: (error: any) => Promise<unknown>) => {
                this.xhr?.addEventListener('beforesend', () => {
                    this.reqConfig = beforeRequest(this.reqConfig) as RequestConfig;
                });
                this.requestError(error);
            }
        },
        /**
         * @description 响应拦截器
         */
        response: {
            use: (response: (response: any) => any, error: (error: any) => Promise<unknown>) => {
                this.xhr?.addEventListener('loadend', () => {
                    this.response = response(this.response);
                });
                this.responseError(error);
            }
        }
    };

    private response = null;
    private error = null;

    /**
     * @description 请求拦截器请求前执行的函数 
     * @param func 请求前执行的函数 
     */
    private beforeRequest(func: Function) {
        this.reqConfig = func(this.reqConfig);
    }

    /**
     * @description 请求拦截器请求错误执行的函数 
     * @param func 请求错误执行的函数 
     */
    private requestError(func: Function) {
        func(this.error);
    }

    /**
     * @description 响应拦截器响应后执行的函数 
     * @param func 响应后执行的函数 
     */
    private responseCall(func: Function) {
        this.response = func(this.response);
    }

    /**
     * @description 响应拦截器响应错误执行的函数 
     * @param func 响应错误执行的函数 
     */
    private responseError(func: Function) {
        func(this.error);
    }

    private xhr: null | XMLHttpRequest = null;

    /**
     * @description 默认配置
     */
    public defaults: Config = {
        baseURL: '',
        timeout: 0,
        headers: {},
        method: 'GET',
        withCredentials: false,
        responseType: '',
        responseEncoding: '',
        xsrfCookieName: '',
        xsrfHeaderName: '',
        maxContentLength: 0,
        maxBodyLength: 0
    };

    /**
     * @description 默认请求配置
     */
    private defaultsReqConfig: RequestConfig = {
        data: {},
        ...this.defaults
    };

    /**
     * @description 请求配置
     */
    private reqConfig: RequestConfig = {
        data: {},
        ...this.defaults
    };

    private buildSendData(method: Config['method']) {
        if (method === 'GET') {
            return '';
        } else {
            return JSON.stringify(this.reqConfig.data);
        }
    }

    /**
     * @description 请求后执行的函数
     */
    private afterRequest() {
        this.reqConfig = this.defaultsReqConfig;
        this.xhr = null;
    }

    /**
     * @description 发送请求 
     * @param url 请求 URL  
     * @param method 请求方法 
     */
    private commonRequest(url: string, method: Config['method'] = 'GET'): Promise<ResolveCallback> {
        this.xhr = new XMLHttpRequest() as XMLHttpRequest;
        // 设置超时时间
        this.xhr.timeout = this.reqConfig.timeout ?? 0;
        // 跨域请求时是否需要使用凭证
        this.xhr.withCredentials = this.reqConfig.withCredentials ?? false;
        // 响应的数据类型
        this.xhr.responseType = this.reqConfig.responseType ?? '';
        // 设置请求头
        if (this.reqConfig.headers) {
            for (const [key, value] of Object.entries(this.reqConfig.headers)) {
                this.xhr.setRequestHeader(key, value as string);
            }
        }

        this.xhr.open(method, `${this.defaults.baseURL}${url}${this.reqConfig.params && objToQueryString(this.reqConfig.params)}`, true);

        return new Promise((resolve, reject: (reason: ResolveCallback) => void) => {
            if (this.xhr) {
                // 请求拦截监听
                this.xhr.addEventListener('beforesend', () => {
                    // this.reqConfig = this.interceptors.request.use((beforeRequest: this.reqConfig) => {}, );
                });

                // 响应拦截监听
                this.xhr.addEventListener('loadend', () => {
                    this.response = this.xhr?.response;
                });

                this.xhr.send(this.buildSendData(method));

                /**
                 * @description 请求超时
                 */
                this.xhr.ontimeout = () => {
                    this.afterRequest();
                    reject({
                        data: {},
                        statusCode: 408,
                        statusText: '请求超时',
                        headers: {},
                        request: this.xhr as XMLHttpRequest
                    });
                    return;
                }

                /**
                 * @description 请求失败
                 */
                this.xhr.onerror = () => {
                    this.afterRequest();
                    reject({
                        data: {},
                        statusCode: 502,
                        statusText: '请求失败，请检查客户端网络是否正常',
                        headers: {},
                        request: this.xhr as XMLHttpRequest
                    });
                    return;
                }

                /**
                 * @description 请求成功
                 */
                this.xhr.onreadystatechange = () => {
                    if (this.xhr && this.xhr.readyState === this.xhr.DONE) {
                        this.response = this.xhr.response;
                    }
                }

                this.afterRequest();
                resolve({
                    data: this.response as any,
                    statusCode: this.xhr.status,
                    statusText: this.xhr.statusText,
                    headers: this.xhr.getResponseHeader,
                    request: this.xhr as XMLHttpRequest
                });
                return;
            }
        });
    }

    /**
     * @description 发送 get 请求
     * @param url 请求的 url
     * @param config 请求的配置
     */
    public get(url: string, config?: Config) {
        this.reqConfig = {
            ...this.reqConfig,
            ...config
        };
        return this.commonRequest(url, 'GET');
    }

    /**
     * @description 发送 post 请求
     * @param url 请求的 url
     * @param config 请求的配置
     */
    public post(url: string, config?: Config) {
        this.reqConfig = {
            ...this.reqConfig,
            ...config
        };

        return this.commonRequest(url, 'POST');
    }

    /**
     * @description 发送 put 请求
     * @param url 请求的 url
     * @param config 请求的配置 
     */
    public put(url: string, config?: Config) {
        this.reqConfig = {
            ...this.reqConfig,
            ...config
        };

        return this.commonRequest(url, 'POST');
    }

    /**
     * @description 发送 delete 请求 
     * @param url 请求的 url 
     * @param config 请求的配置 
     */
    public delete(url: string, config?: Config) {
        this.reqConfig = {
            ...this.reqConfig,
            ...config
        };

        return this.commonRequest(url, 'DELETE');
    }

    /**
     * @description 发送请求 
     * @param config 请求的配置 
     */
    public request(config: Config) {
        this.reqConfig = {
            ...this.reqConfig,
            ...config
        };

        return this.commonRequest(this.reqConfig.url as string, this.reqConfig.method);
    }

    /**
     * @description 发送 head 请求 
     * @param url 请求的 url 
     * @param config 请求的配置 
     */
    public head(url: string, config?: Config) {
        this.reqConfig = {
            ...this.reqConfig,
            ...config
        };

        return this.commonRequest(url, 'HEAD');
    }

    /**
     * @description 发送 options 请求 
     * @param url 请求的 url 
     * @param config 请求的配置 
     */
    public options(url: string, config?: Config) {
        this.reqConfig = {
            ...this.reqConfig,
            ...config
        };

        return this.commonRequest(url, 'OPTIONS');
    }

    /**
     * @description 发送 patch 请求 
     * @param url 请求的 url 
     * @param config 请求的配置 
     */
    public patch(url: string, config?: Config) {
        this.reqConfig = {
            ...this.reqConfig,
            ...config
        };

        return this.commonRequest(url, 'PATCH');
    }

    /**
     * @description 中断请求
     */
    public abort() {
        this.xhr?.abort();
    }

    /**
     * @description 创建一个实例 
     * @param config 实例的配置 
     */
    public create(config: Config) {
        this.defaults = {
            ...config
        }

        return this;
    }

    /**
     * @description 设置请求配置 
     * @param config 请求配置 
     */
    public setConfig(config: Config) {
        this.reqConfig = {
            ...this.defaultsReqConfig,
            ...config
        }

        return this;
    }

    /**
     * @description 获取请求配置
     */
    public getConfig() {
        return this.reqConfig;
    }

    /**
     * @description 获取请求的根域名
     */
    public getBaseURL() {
        return this.reqConfig.baseURL;
    }

    /**
     * @description 设置请求头
     */
    public setHeader(headers: object) {
        this.reqConfig.headers = {
            ...this.reqConfig.headers,
            ...headers
        }

        return this;
    }
};

export default new LwuXHR;