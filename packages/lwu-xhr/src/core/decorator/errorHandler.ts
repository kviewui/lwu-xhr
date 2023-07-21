import { IRequest, Interceptor } from '../../types';

/**
 * 定义一个错误处理装饰器类，用来为 XMLHttpRequest 添加错误处理逻辑
 */
export class ErrorHandlerDecorator implements IRequest {
    /**
     * 定义一个私有的错误处理函数属性
     */
    private errorHandler;
    private requestLib: IRequest;

    /**
     * 定义一个公共的构造函数，接收一个 IRequest 接口的实例，一个错误处理函数，实现错误处理装饰器类的构造函数 
     * @param request - IRequest 接口的实例 
     * @param errorHandler - 错误处理函数 
     */
    constructor(
        errorHandler: (error: any) => void,
        requestLib: IRequest
    ) {
        this.errorHandler = errorHandler;
        this.requestLib = requestLib;
    }

    /** 
     * 重写 get 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 get 请求，并添加错误处理逻辑
     * @param url - 请求地址 
     * @param config - 请求配置 
     */
    public async get(url: string, config?: object): Promise<any> {
        return await this.requestLib.get(url, config).then(
            (response: any) => {
                // 如果响应成功，返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，调用错误处理函数，将错误信息传入
                this.errorHandler && this.errorHandler(error);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 post 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 post 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - 请求配置
     */
    public async post(url: string, data?: any, config?: object): Promise<any> {
        return await this.requestLib.post(url, data, config).then(
            (response: any) => {
                // 如果响应成功，返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，调用错误处理函数，将错误信息传入
                this.errorHandler && this.errorHandler(error);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 put 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 put 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - 请求配置
     */
    public async put(url: string, data?: any, config?: object): Promise<any> {
        return await this.requestLib.put(url, data, config).then(
            (response: any) => {
                // 如果响应成功，返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，调用错误处理函数，将错误信息传入
                this.errorHandler && this.errorHandler(error);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 delete 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 delete 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @param data - 请求参数
     */
    public async delete(url: string, config?: object): Promise<any> {
        return await this.requestLib.delete(url, config).then(
            (response: any) => {
                // 如果响应成功，返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，调用错误处理函数，将错误信息传入
                this.errorHandler && this.errorHandler(error);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 head 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 head 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     */
    public async head(url: string, config?: object): Promise<any> {
        return await this.requestLib.head(url, config).then(
            (response: any) => {
                // 如果响应成功，返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，调用错误处理函数，将错误信息传入
                this.errorHandler && this.errorHandler(error);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 options 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 options 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     */
    public async options(url: string, config?: object): Promise<any> {
        return await this.requestLib.options(url, config).then(
            (response: any) => {
                // 如果响应成功，返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，调用错误处理函数，将错误信息传入
                this.errorHandler && this.errorHandler(error);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 patch 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 patch 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - 请求配置
     */
    public async patch(url: string, data?: any, config?: object): Promise<any> {
        return await this.requestLib.patch(url, data, config).then(
            (response: any) => {
                // 如果响应成功，返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，调用错误处理函数，将错误信息传入
                this.errorHandler && this.errorHandler(error);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 定义一个 timeout 属性，用来设置请求超时时间
     * @param timeout - 超时时间，单位毫秒
     * @returns {number} - 返回超时时间
     * @memberof InterceptorDecorator
     * @example
     * ```js
     * // 设置超时时间为 1000 毫秒
     * request.timeout = 1000;
     * ```
     * @example
     * ```js
     * // 获取超时时间
     * console.log(request.timeout); // 1000
     * ```
     */
    public get timeout(): number {
        return this.requestLib.timeout;
    }

    public get interceptors(): Interceptor[] {
        return this.requestLib.interceptors;
    }
}