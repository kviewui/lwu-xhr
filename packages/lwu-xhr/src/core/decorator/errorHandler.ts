import { IRequest, IErrorHandlerDecorator, RequestConfig } from '../../types';

/**
 * 定义一个错误处理装饰器类，用来为 XMLHttpRequest 添加错误处理逻辑
 */
export class ErrorHandlerDecorator implements IErrorHandlerDecorator {
    /**
     * 定义一个私有的错误处理函数属性
     */
    private errorHandler: (error: any) => void;
    public requestLib: IRequest;

    /**
     * 定义一个公共的构造函数，接收一个 IRequest 接口的实例，一个错误处理函数，实现错误处理装饰器类的构造函数 
     * @param request - IRequest 接口的实例 
     * @param errorHandler - 错误处理函数 
     */
    constructor(
        requestLib: IRequest
    ) {
        this.errorHandler = (error: any) => {};
        this.requestLib = requestLib;
    }

    /** 
     * 重写 get 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 get 请求，并添加错误处理逻辑
     * @param url - 请求地址 
     * @param config - 请求配置 
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    public async get(url: string, config?: RequestConfig): Promise<any> {
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
     * 重写 post 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 post 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    public async post(url: string, config?: RequestConfig): Promise<any> {
        return await this.requestLib.post(url, config).then(
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
     * 重写 put 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 put 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    public async put(url: string, config?: RequestConfig): Promise<any> {
        if (!this.requestLib.put) {
            return Promise.reject('put method is not supported');
        }

        return await this.requestLib.put(url, config).then(
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
     * 重写 delete 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 delete 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    public async delete(url: string, config?: RequestConfig): Promise<any> {
        if (!this.requestLib.delete) {
            return Promise.reject('delete method is not supported');
        }

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
     * 重写 head 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 head 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    public async head(url: string, config?: RequestConfig): Promise<any> {
        if (!this.requestLib.head) {
            return Promise.reject('head method is not supported');
        }

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
     * 重写 options 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 options 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    public async options(url: string, config?: RequestConfig): Promise<any> {
        if (!this.requestLib.options) {
            return Promise.reject('options method is not supported');
        }

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
     * 重写 patch 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 patch 请求，并添加错误处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    public async patch(url: string, config?: RequestConfig): Promise<any> {
        if (!this.requestLib.patch) {
            return Promise.reject('patch method is not supported');
        }

        return await this.requestLib.patch(url, config).then(
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
     * 重写 request 方法，接收请求配置，返回一个 Promise 对象，实现 request 请求，并添加错误处理逻辑
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof ErrorHandlerDecorator
     */
    public async request(config: RequestConfig): Promise<any> {
        if (!this.requestLib.request) {
            return Promise.reject('request method is not supported');
        }

        return await this.requestLib.request(config).then(
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
     * 定义一个公共的 setErrorHandler 方法，接收一个错误处理函数，用来设置错误处理函数
     * @param errorHandler - 错误处理函数
     * @memberof ErrorHandlerDecorator
     */
    public setErrorHandler(errorHandler: (error: any) => void): void {
        this.errorHandler = errorHandler;
    }

    /**
     * 公有方法，用来批量设置请求头
     * @param headers - 请求头对象
     * @memberof ErrorHandlerDecorator
     */
    public setHeaders(headers: Record<any, any>): this {
        if (!this.requestLib.setHeaders) {
            throw new Error('setHeaders method is not supported');
        }
        this.requestLib.setHeaders(headers);
        return this;
    }

    /**
     * 公有方法，用来设置单个请求头
     * @param key - 请求头的 key
     * @param value - 请求头的 value
     * @memberof ErrorHandlerDecorator
     */
    public setHeader(key: string, value: string): this {
        if (!this.requestLib.setHeader) {
            throw new Error('setHeader method is not supported');
        }

        this.requestLib.setHeader(key, value);
        return this;
    }

    /**
     * 公有方法，用来设置超时时间
     * @param timeout - 超时时间
     * @memberof ErrorHandlerDecorator
     */
    public setTimeout(timeout: number): this {
        if (!this.requestLib.setTimeout) {
            throw new Error('setTimeout method is not supported');
        }
        
        this.requestLib.setTimeout(timeout);
        return this;
    }
}