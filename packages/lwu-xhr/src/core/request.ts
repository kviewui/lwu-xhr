import { IRequest, Interceptor } from '../types';
import { Singleton } from './singleton';

/**
 * 定义一个请求库类，实现 IRequest 接口
 */
export class RequestLibraryImpl implements IRequest {
    private xhr: XMLHttpRequest;
    private _timeout: number;
    private _interceptors: Interceptor[];

    constructor() {
        // 使用单例模式获取 XMLHttpRequest 实例
        this.xhr = Singleton.getInstance();
        // 默认超时时间为 0
        this._timeout = 0;
        // 默认拦截器为空数组
        this._interceptors = [];
    }

    /**
     * 重写 get 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 get 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public async get(url: string, data?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('GET', url, true);
            // 设置响应类型 为json
            this.xhr.responseType = 'json';
            // 监听响应
            this.xhr.onload = () => {
                // 如果响应成功
                if (this.xhr.status === 200) {
                    // 返回响应数据
                    resolve(this.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${this.xhr.status}`));
                }
            };
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.status}`));
            }
            // 发送请求，如果请求参数存在，则将请求参数转换为 JSON 字符串作为请求体
            if (data) {
                const query = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
                this.xhr.send(query);
            } else {
                this.xhr.send();
            }
        });
    }

    /**
     * 重写 post 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 post 请求
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public async post(url: string, data?: any, config?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('POST', url, true);
            // 设置请求头为json格式
            this.xhr.setRequestHeader('Content-Type', 'application/json');
            // 设置响应类型 为json
            this.xhr.responseType = 'json';
            // 监听响应
            this.xhr.onload = () => {
                // 如果响应成功
                if (this.xhr.status === 200) {
                    // 返回响应数据
                    resolve(this.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${this.xhr.status}`));
                }
            };
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.status}`));
            }
            // 发送请求，如果请求参数存在，则将请求参数转换为 JSON 字符串作为请求体
            if (data) {
                // 设置请求头为json格式
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                // 发送请求
                this.xhr.send(JSON.stringify(data));
            } else {
                this.xhr.send();
            }
        });
    }

    /**
     * 重写 put 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 put 请求
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public async put(url: string, data?: any, config?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('PUT', url, true);
            // 设置请求头为json格式
            this.xhr.setRequestHeader('Content-Type', 'application/json');
            // 设置响应类型 为json
            this.xhr.responseType = 'json';
            // 监听响应
            this.xhr.onload = () => {
                // 如果响应成功
                if (this.xhr.status === 200) {
                    // 返回响应数据
                    resolve(this.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${this.xhr.status}`));
                }
            };
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.status}`));
            }
            // 发送请求，如果请求参数存在，则将请求参数转换为 JSON 字符串作为请求体
            if (data) {
                // 设置请求头为json格式
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                // 发送请求
                this.xhr.send(JSON.stringify(data));
            } else {
                this.xhr.send();
            }
        });
    }

    /**
     * 重写 delete 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 delete 请求
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public async delete(url: string, data?: any, config?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('DELETE', url, true);
            // 设置响应类型 为json
            this.xhr.responseType = 'json';
            // 监听响应
            this.xhr.onload = () => {
                // 如果响应成功
                if (this.xhr.status === 200) {
                    // 返回响应数据
                    resolve(this.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${this.xhr.status}`));
                }
            };
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.status}`));
            }
            // 发送请求，如果请求参数存在，则将请求参数转换为 JSON 字符串作为请求体
            if (data) {
                // 设置请求头为json格式
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                // 发送请求
                this.xhr.send(JSON.stringify(data));
            } else {
                this.xhr.send();
            }
        });
    }

    /**
     * 重写 head 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 head 请求
     * @param url - 请求地址
     * @param config - 请求配置
     */

    public async head(url: string, config?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('HEAD', url, true);
            // 设置响应类型 为json
            this.xhr.responseType = 'json';
            // 监听响应
            this.xhr.onload = () => {
                // 如果响应成功
                if (this.xhr.status === 200) {
                    // 返回响应数据
                    resolve(this.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${this.xhr.status}`));
                }
            };
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.status}`));
            }
            // 发送请求
            this.xhr.send();
        });
    }

    /**
     * 重写 options 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 options 请求
     * @param url - 请求地址
     * @param config - 请求配置
     */
    public async options(url: string, config?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('OPTIONS', url, true);
            // 设置响应类型 为json
            this.xhr.responseType = 'json';
            // 监听响应
            this.xhr.onload = () => {
                // 如果响应成功
                if (this.xhr.status === 200) {
                    // 返回响应数据
                    resolve(this.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${this.xhr.status}`));
                }
            };
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.status}`));
            }
            // 发送请求
            this.xhr.send();
        });
    }

    /**
     * 重写 patch 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 patch 请求
     * @param url - 请求地址
     * @param data - 请求参数
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public async patch(url: string, data?: any, config?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('PATCH', url, true);
            // 设置请求头为json格式
            this.xhr.setRequestHeader('Content-Type', 'application/json');
            // 设置响应类型 为json
            this.xhr.responseType = 'json';
            // 监听响应
            this.xhr.onload = () => {
                // 如果响应成功
                if (this.xhr.status === 200) {
                    // 返回响应数据
                    resolve(this.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${this.xhr.status}`));
                }
            };
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.status}`));
            }
            // 发送请求，如果请求参数存在，则将请求参数转换为 JSON 字符串作为请求体
            if (data) {
                // 设置请求头为json格式
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                // 发送请求
                this.xhr.send(JSON.stringify(data));
            } else {
                this.xhr.send();
            }
        });
    }

    // 实现请求库接口的属性，直接赋值或返回相应的值
    public get timeout(): number {
        return this._timeout;
    }

    public set timeout(value: number) {
        this._timeout = value;
    }

    public get interceptors(): Interceptor[] {
        return this._interceptors;
    }

    public set interceptors(value: Interceptor[]) {
        this._interceptors = value;
    }
};