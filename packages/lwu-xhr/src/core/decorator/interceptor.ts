import { IRequest, Interceptor } from '../../types';

/**
 * 定义一个拦截器装饰器类，用来为 XMLHttpRequest 添加拦截器处理逻辑
 */
export class InterceptorDecorator implements IRequest {
    private requestLib: IRequest;

    constructor(requestLib: IRequest) {
        this.requestLib = requestLib;
    }

    /**
     * 重写 get 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 get 请求，并添加拦截器处理逻辑 
     * @param url - 请求地址 
     * @param config - 请求配置 
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async get(url: string, config?: object): Promise<any> {
        // 在请求前执行所有请求拦截器的请求前处理方法，传入请求配置
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor: any) => {
                config = interceptor.request && interceptor.request(config);
            });
        }

        // 调用被装饰的 get 方法，传入请求地址和请求配置
        let response = await this.requestLib.get(url, config);
        // 在请求后执行所有请求拦截器的请求后处理方法，传入响应数据
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor_1: any) => {
                response = interceptor_1.response && interceptor_1.response(response);
            });
        }
        return response;
    }

    /**
     * 重写 post 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 post 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async post(url: string, data?: any, config?: object): Promise<any> {
        // 在请求前执行所有请求拦截器的请求前处理方法，传入请求配置
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor: any) => {
                config = interceptor.request && interceptor.request(config);
            });
        }

        // 调用被装饰的 post 方法，传入请求地址和请求参数
        let response = await this.requestLib.post(url, data, config);
        // 在请求后执行所有请求拦截器的请求后处理方法，传入响应数据
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor_1: any) => {
                response = interceptor_1.response && interceptor_1.response(response);
            });
        }
        return response;
    }

    /**
     * 重写 put 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 put 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async put(url: string, data?: any, config?: object): Promise<any> {
        // 在请求前执行所有请求拦截器的请求前处理方法，传入请求配置
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor: any) => {
                config = interceptor.request && interceptor.request(config);
            });
        }

        // 调用被装饰的 put 方法，传入请求地址和请求参数
        let response = await this.requestLib.put(url, data, config);
        // 在请求后执行所有请求拦截器的请求后处理方法，传入响应数据
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor_1: any) => {
                response = interceptor_1.response && interceptor_1.response(response);
            });
        }
        return response;
    }

    /**
     * 重写 delete 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 delete 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async delete(url: string, config?: object): Promise<any> {
        // 在请求前执行所有请求拦截器的请求前处理方法，传入请求配置
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor: any) => {
                config = interceptor.request && interceptor.request(config);
            });
        }

        // 调用被装饰的 delete 方法，传入请求地址和请求参数
        let response = await this.requestLib.delete(url, config);
        // 在请求后执行所有请求拦截器的请求后处理方法，传入响应数据
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor_1: any) => {
                response = interceptor_1.response && interceptor_1.response(response);
            });
        }
        return response;
    }

    /**
     * 重写 head 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 head 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async head(url: string, config?: object): Promise<any> {
        // 在请求前执行所有请求拦截器的请求前处理方法，传入请求配置
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor: any) => {
                config = interceptor.request && interceptor.request(config);
            });
        }

        // 调用被装饰的 head 方法，传入请求地址和请求参数
        let response = await this.requestLib.head(url, config);
        // 在请求后执行所有请求拦截器的请求后处理方法，传入响应数据
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor_1: any) => {
                response = interceptor_1.response && interceptor_1.response(response);
            });
        }
        return response;
    }

    /**
     * 重写 options 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 options 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async options(url: string, config?: object): Promise<any> {
        // 在请求前执行所有请求拦截器的请求前处理方法，传入请求配置
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor: any) => {
                config = interceptor.request && interceptor.request(config);
            });
        }

        // 调用被装饰的 options 方法，传入请求地址和请求参数
        let response = await this.requestLib.options(url, config);
        // 在请求后执行所有请求拦截器的请求后处理方法，传入响应数据
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor_1: any) => {
                response = interceptor_1.response && interceptor_1.response(response);
            });
        }
        return response;
    }

    /**
     * 重写 patch 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 patch 请求，并添加拦截器处理逻辑
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof InterceptorDecorator
     */
    public async patch(url: string, data?: any, config?: object): Promise<any> {
        // 在请求前执行所有请求拦截器的请求前处理方法，传入请求配置
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor: any) => {
                config = interceptor.request && interceptor.request(config);
            });
        }

        // 调用被装饰的 patch 方法，传入请求地址和请求参数
        let response = await this.requestLib.patch(url, data, config);
        // 在请求后执行所有请求拦截器的请求后处理方法，传入响应数据
        if (this.requestLib.interceptors) {
            this.requestLib.interceptors.forEach((interceptor_1: any) => {
                response = interceptor_1.response && interceptor_1.response(response);
            });
        }
        return response;
    }

    /**
     * 实现请求库接口的属性，直接返回被装饰对象的相应属性
     */
    public get timeout(): number {
        return this.requestLib.timeout;
    }

    public get interceptors(): Interceptor[] {
        return this.requestLib.interceptors;
    }
}