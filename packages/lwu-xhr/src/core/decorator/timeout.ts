import { IInterceptorDecorator, IRequest, ITimeoutDecorator, RequestConfig } from '../../types';

/**
 * 定义一个超时处理装饰器类，继承自 RequestInterceptor 类
 */
export class TimeoutDecorator implements ITimeoutDecorator {

    public requestLib: IInterceptorDecorator;

    /**
     * 定义一个私有的超时时间属性
     * @private
     * @type {number}
     * @memberof TimeoutDecorator
     */
    private _timeout: number = 0;

    /**
     * 定义一个私有的超时处理函数属性
     */
    private timeoutHandler: (url: string) => any;

    /**
     * 定义一个公共的构造函数，接收一个 IRequest 接口的实例，一个超时时间，一个超时处理函数，实现超时处理装饰器类的构造函数 
     * @param request - IRequest 接口的实例 
     * @param timeout - 超时时间 
     * @param timeoutHandler - 超时处理函数 
     */
    constructor(
        requestLib: IInterceptorDecorator,
    ) {
        this.timeoutHandler = (url: string) => { };
        this.requestLib = requestLib;
        this._timeout = 0;
    }

    /**
     * 重写 get 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 get 请求，并添加超时处理逻辑 
     * @param url - 请求地址 
     * @param config - 请求配置 
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    public async get(url: string, config?: RequestConfig): Promise<any> {
        this.timeoutHandler = () => {
            // 如果有超时处理函数，则执行超时处理函数，将请求地址传入
            this.timeoutHandler && this.timeoutHandler(url);
            // 返回一个错误信息
            return `Timeout of ${this._timeout} ms exceeded`;
        };

        // 定义一个定时器，超时时间为传入的超时时间，超时后执行超时处理函数
        const timer = setTimeout(this.timeoutHandler, this._timeout);
        await this.requestLib.get(url, config).then(
            (response: any) => {
                // 如果响应成功，清除定时器
                clearTimeout(timer);
                // 返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，清除定时器
                clearTimeout(timer);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 post 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 post 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    public async post(url: string, config?: RequestConfig): Promise<any> {
        this.timeoutHandler = () => {
            // 如果有超时处理函数，则执行超时处理函数，将请求地址传入
            this.timeoutHandler && this.timeoutHandler(url);
            // 返回一个错误信息
            return `Timeout of ${this._timeout} ms exceeded`;
        };

        // 定义一个定时器，超时时间为传入的超时时间，超时后执行超时处理函数
        const timer = setTimeout(this.timeoutHandler, this._timeout);
        await this.requestLib.post(url, config).then(
            (response: any) => {
                // 如果响应成功，清除定时器
                clearTimeout(timer);
                // 返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，清除定时器
                clearTimeout(timer);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 put 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 put 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    public async put(url: string, config?: RequestConfig): Promise<any> {
        if (!this.requestLib.put) {
            return Promise.reject('当前运行环境不支持 put 请求');
        }

        this.timeoutHandler = () => {
            // 如果有超时处理函数，则执行超时处理函数，将请求地址传入
            this.timeoutHandler && this.timeoutHandler(url);
            // 返回一个错误信息
            return `Timeout of ${this._timeout} ms exceeded`;
        };

        // 定义一个定时器，超时时间为传入的超时时间，超时后执行超时处理函数
        const timer = setTimeout(this.timeoutHandler, this._timeout);
        await this.requestLib.put(url, config).then(
            (response: any) => {
                // 如果响应成功，清除定时器
                clearTimeout(timer);
                // 返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，清除定时器
                clearTimeout(timer);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 delete 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 delete 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    public async delete(url: string, config?: RequestConfig): Promise<any> {
        if (!this.requestLib.delete) {
            return Promise.reject('当前运行环境不支持 delete 请求');
        }
        this.timeoutHandler = () => {
            // 如果有超时处理函数，则执行超时处理函数，将请求地址传入
            this.timeoutHandler && this.timeoutHandler(url);
            // 返回一个错误信息
            return `Timeout of ${this._timeout} ms exceeded`;
        };

        // 定义一个定时器，超时时间为传入的超时时间，超时后执行超时处理函数
        const timer = setTimeout(this.timeoutHandler, this._timeout);
        await this.requestLib.delete(url, config).then(
            (response: any) => {
                // 如果响应成功，清除定时器
                clearTimeout(timer);
                // 返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，清除定时器
                clearTimeout(timer);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 head 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 head 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    public async head(url: string, config?: RequestConfig): Promise<any> {
        if (!this.requestLib.head) {
            return Promise.reject('当前运行环境不支持 head 请求');
        }

        this.timeoutHandler = () => {
            // 如果有超时处理函数，则执行超时处理函数，将请求地址传入
            this.timeoutHandler && this.timeoutHandler(url);
            // 返回一个错误信息
            return `Timeout of ${this._timeout} ms exceeded`;
        };

        // 定义一个定时器，超时时间为传入的超时时间，超时后执行超时处理函数
        const timer = setTimeout(this.timeoutHandler, this._timeout);
        await this.requestLib.head(url, config).then(
            (response: any) => {
                // 如果响应成功，清除定时器
                clearTimeout(timer);
                // 返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，清除定时器
                clearTimeout(timer);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 options 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 options 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    public async options(url: string, config?: RequestConfig): Promise<any> {
        if (!this.requestLib.options) {
            return Promise.reject('当前运行环境不支持 options 请求');
        }

        this.timeoutHandler = () => {
            // 如果有超时处理函数，则执行超时处理函数，将请求地址传入
            this.timeoutHandler && this.timeoutHandler(url);
            // 返回一个错误信息
            return `Timeout of ${this._timeout} ms exceeded`;
        };

        // 定义一个定时器，超时时间为传入的超时时间，超时后执行超时处理函数
        const timer = setTimeout(this.timeoutHandler, this._timeout);
        await this.requestLib.options(url, config).then(
            (response: any) => {
                // 如果响应成功，清除定时器
                clearTimeout(timer);
                // 返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，清除定时器
                clearTimeout(timer);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 request 方法，接收请求配置，返回一个 Promise 对象，实现 patch 请求，并添加超时处理逻辑
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator
     */
    public async request(config: RequestConfig): Promise<any> {
        if (!this.requestLib.request) {
            return Promise.reject('当前运行环境不支持 request 请求');
        }

        this.timeoutHandler = () => {
            // 如果有超时处理函数，则执行超时处理函数，将请求地址传入
            this.timeoutHandler && this.timeoutHandler(config.url ?? '');
            // 返回一个错误信息
            return `Timeout of ${this._timeout} ms exceeded`;
        };

        // 定义一个定时器，超时时间为传入的超时时间，超时后执行超时处理函数
        const timer = setTimeout(this.timeoutHandler, this._timeout);
        await this.requestLib.request(config).then(
            (response: any) => {
                // 如果响应成功，清除定时器
                clearTimeout(timer);
                // 返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，清除定时器
                clearTimeout(timer);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 重写 patch 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 patch 请求，并添加超时处理逻辑
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof TimeoutDecorator 
     */
    public async patch(url: string, config?: RequestConfig): Promise<any> {
        if (!this.requestLib.patch) {
            return Promise.reject('当前运行环境不支持 patch 请求');
        }

        this.timeoutHandler = () => {
            // 如果有超时处理函数，则执行超时处理函数，将请求地址传入
            this.timeoutHandler && this.timeoutHandler(url);
            // 返回一个错误信息
            return `Timeout of ${this._timeout} ms exceeded`;
        };

        // 定义一个定时器，超时时间为传入的超时时间，超时后执行超时处理函数
        const timer = setTimeout(this.timeoutHandler, this._timeout);
        await this.requestLib.patch(url, config).then(
            (response: any) => {
                // 如果响应成功，清除定时器
                clearTimeout(timer);
                // 返回响应数据
                return response;
            },
            (error: any) => {
                // 如果失败，清除定时器
                clearTimeout(timer);
                // 返回错误信息
                return error;
            }
        )
    }

    /**
     * 公有方法，用来批量设置请求头
     * @param headers - 请求头对象
     * @memberof ErrorHandlerDecorator
     */
    public setHeaders(headers: Record<any, any>): void {
        if (!this.requestLib.setHeaders) {
            throw new Error('当前运行环境不支持 setHeaders 方法');
        }
        this.requestLib.setHeaders(headers);
    }

    /**
     * 公有方法，用来设置单个请求头
     * @param key - 请求头的 key
     * @param value - 请求头的 value
     * @memberof ErrorHandlerDecorator
     */
    public setHeader(key: string, value: string): void {
        if (!this.requestLib.setHeader) {
            throw new Error('当前运行环境不支持 setHeader 方法');
        }
        
        this.requestLib.setHeader(key, value);
    }

    /**
     * 公有方法，用来设置超时处理
     * @param timeout - 超时时间
     * @param timeoutHandler - 超时处理函数
     * @memberof ErrorHandlerDecorator
     */
    public timeout(timeout: number, timeoutHandler: (url: string) => any): this {
        // 将传入的超时时间赋值给私有的超时时间属性
        this._timeout = timeout;
        // 将传入的超时处理函数赋值给私有的超时处理函数属性
        this.timeoutHandler = timeoutHandler;
        return this;
    }
}