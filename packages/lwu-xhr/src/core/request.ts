import { isEmptyObject, objToQueryString } from 'src/tools';
import { Config, IRequest, RequestConfig } from '../types';

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
export class RequestLibraryImpl implements IRequest {
    /**
     * 定义一个私有的属性，用来存储 XMLHttpRequest 实例
     */
    private xhr: XMLHttpRequest;
    /**
     * 定义一个私有的属性，用来存储请求头对象
     */
    private headers: Record<string, string>;
    /**
     * 定义一个私有的属性，用来存储请求超时时间
     */
    private timeout: number;

    constructor(xhr: XMLHttpRequest) {
        // 初始化 XMLHttpRequest 实例
        this.xhr = xhr;
        // 初始化请求超时时间
        this.timeout = 0;
        // 初始化请求头对象
        this.headers = {};
    }

    /**
     * 重写 get 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 get 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public get(url: string, config?: RequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            // 如果请求参数存在，则将请求参数转换为查询字符串，拼接到请求地址后面
            if (config?.params && isEmptyObject(config.params) === false) {
                url += `?${objToQueryString(config.params)}`;
            }
            // 设置请求方法和请求地址
            this.xhr.open('GET', url, true);
            // 设置请求头
            this._setHeaders();
            console.log('config', config);
            // 设置超时时间
            this.xhr.timeout = config?.timeout ?? this.timeout;
            // 发送请求
            this.xhr.send();
            // 监听响应
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState === 4) {
                    if (this.xhr.status >= 200 && this.xhr.status < 300) {
                        // 返回响应数据
                        resolve(this.xhr.responseText);
                    } else {
                        // 返回响应错误信息
                        reject(new Error(`请求失败：${this.xhr.statusText}`));
                    }
                }
            }
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.statusText}`));
            }
        });
    }

    /**
     * 重写 post 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 post 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public post(url: string, config?: RequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('POST', url, true);
            // 设置请求头
            this._setHeaders();
            // 设置超时时间
            this.xhr.timeout = config?.timeout ?? this.timeout;
            // 监听响应
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState === 4) {
                    if (this.xhr.status >= 200 && this.xhr.status < 300) {
                        // 返回响应数据
                        resolve(this.xhr.responseText);
                    } else {
                        // 返回响应错误信息
                        reject(new Error(`请求失败：${this.xhr.statusText}`));
                    }
                }
            }
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.statusText}`));
            }
            // 发送请求，如果请求参数存在，则将请求参数转换为查询字符串作为请求体
            if (config?.data) {
                // 设置请求头为json格式
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                // 发送请求
                this.xhr.send(JSON.stringify(config.data));
            } else {
                this.xhr.send();
            }
        });
    }

    /**
     * 重写 put 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 put 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public put(url: string, config?: RequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('PUT', url, true);
            // 设置请求头
            this._setHeaders();
            // 设置超时时间
            this.xhr.timeout = config?.timeout ?? this.timeout;
            // 监听响应
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState === 4) {
                    if (this.xhr.status >= 200 && this.xhr.status < 300) {
                        // 返回响应数据
                        resolve(this.xhr.responseText);
                    } else {
                        // 返回响应错误信息
                        reject(new Error(`请求失败：${this.xhr.statusText}`));
                    }
                }
            }
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.statusText}`));
            }
            // 发送请求，如果请求参数存在，则将请求参数转换为查询字符串作为请求体
            if (config?.data) {
                // 设置请求头为json格式
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                // 发送请求
                this.xhr.send(JSON.stringify(config.data));
            } else {
                this.xhr.send();
            }
        });
    }

    /**
     * 重写 delete 方法，接收请求地址，返回一个 Promise 对象，实现 delete 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public delete(url: string, config?: RequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('DELETE', url, true);
            // 设置请求头
            this._setHeaders();
            // 设置超时时间
            this.xhr.timeout = config?.timeout ?? this.timeout;
            // 监听响应
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState === 4) {
                    if (this.xhr.status >= 200 && this.xhr.status < 300) {
                        // 返回响应数据
                        resolve(this.xhr.responseText);
                    } else {
                        // 返回响应错误信息
                        reject(new Error(`请求失败：${this.xhr.statusText}`));
                    }
                }
            }
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.statusText}`));
            }
            // 发送请求
            this.xhr.send();
        });
    }

    /**
     * 重写 head 方法，接收请求地址，返回一个 Promise 对象，实现 head 请求
     * @param url - 请求地址
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public head(url: string): Promise<any> {
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
     * 重写 options 方法，接收请求地址，返回一个 Promise 对象，实现 options 请求
     * @param url - 请求地址
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public options(url: string): Promise<any> {
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
     * 重写 patch 方法，接收请求地址和请求配置，返回一个 Promise 对象，实现 patch 请求
     * @param url - 请求地址
     * @param config - 请求配置
     * @returns {Promise<any>}
     * @memberof RequestLibraryImpl
     */
    public patch(url: string, config?: RequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open('PATCH', url, true);
            // 设置请求头
            this._setHeaders();
            // 设置超时时间
            this.xhr.timeout = config?.timeout ?? this.timeout;
            // 监听响应
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState === 4) {
                    if (this.xhr.status >= 200 && this.xhr.status < 300) {
                        // 返回响应数据
                        resolve(this.xhr.responseText);
                    } else {
                        // 返回响应错误信息
                        reject(new Error(`请求失败：${this.xhr.statusText}`));
                    }
                }
            }
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.statusText}`));
            }
            // 发送请求，如果请求参数存在，则将请求参数转换为查询字符串作为请求体
            if (config?.data) {
                // 设置请求头为json格式
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                // 发送请求
                this.xhr.send(JSON.stringify(config.data));
            } else {
                this.xhr.send();
            }
        });
    }

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
    public request(config: RequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址
            this.xhr.open(config.method ?? 'GET', config.url ?? '', true);
            // 设置请求头
            this._setHeaders();
            // 设置超时时间
            this.xhr.timeout = config.timeout ?? this.timeout;
            // 监听响应
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState === 4) {
                    if (this.xhr.status >= 200 && this.xhr.status < 300) {
                        // 返回响应数据
                        resolve(this.xhr.responseText);
                    } else {
                        // 返回响应错误信息
                        reject(new Error(`请求失败：${this.xhr.statusText}`));
                    }
                }
            }
            // 监听错误响应
            this.xhr.onerror = () => {
                // 返回错误信息
                reject(new Error(`请求失败：${this.xhr.statusText}`));
            }
            // 发送请求，如果请求参数存在，则将请求参数转换为查询字符串作为请求体
            if (config.data) {
                // 设置请求头为json格式
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                // 发送请求
                this.xhr.send(JSON.stringify(config.data));
            } else {
                this.xhr.send();
            }
        });
    }

    /**
     * 重写 setHeader 方法，接收请求头的键和值，设置请求头
     * @param key - 请求头的键
     * @param value - 请求头的值
     * @memberof RequestLibraryImpl
     */
    public setHeader(key: string, value: string): void {
        this.headers[key] = value;
    }

    /**
     * 重写 setTimeout 方法，接收超时时间，设置超时时间
     * @param timeout - 超时时间
     * @memberof RequestLibraryImpl
     */
    public setTimeout(timeout: number): void {
        this.timeout = timeout;
    }
    
    /**
     * 重写 setHeaders 方法，接收请求头对象，设置请求头 
     * @param headers - 请求头对象
     * @memberof RequestLibraryImpl 
     */
    public setHeaders(headers: Record<string, string>): void {
        this.headers = headers;
    }

    /**
     * 重写 getXHRInstance 方法，返回 XMLHttpRequest 实例
     * @returns {XMLHttpRequest}
     * @memberof RequestLibraryImpl
     */
    public getXHRInstance(): XMLHttpRequest {
        return this.xhr;
    }

    /**
     * 定义一个私有的方法，用来设置所有的请求头
     * @private
     * @memberof RequestLibraryImpl
     */
    private _setHeaders(): void {
        // 遍历请求头对象，设置请求头
        Object.entries(this.headers).forEach(([key, value]) => {
            this.xhr.setRequestHeader(key, value);
        });
    }
};