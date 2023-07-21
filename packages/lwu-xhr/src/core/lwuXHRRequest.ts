import { IRequest } from '../types';

export class LwuXHRRequest implements IRequest {
    // 定义一个私有的 XMLHttpRequest 对象
    private static xhr: XMLHttpRequest = new XMLHttpRequest();

    // 定义一个私有的 LwuXHRRequest 类的实例
    private static instance: LwuXHRRequest;

    // 定义一个私有的构造函数
    private constructor() {}

    public static getInstance(): LwuXHRRequest {
        // 如果 LwuXHRRequest 类的实例不存在，则创建一个新的 LwuXHRRequest 类的实例
        if (!LwuXHRRequest.instance) {
            LwuXHRRequest.instance = new LwuXHRRequest();
        }
        
        // 返回 LwuXHRRequest 类的实例
        return LwuXHRRequest.instance;
    }

    // 定义一个公共的 get 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 get 请求
    public get(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址 
            LwuXHRRequest.xhr.open('GET', url, true);
            // 设置响应类型 为json 
            LwuXHRRequest.xhr.responseType = 'json';
            // 监听响应
            LwuXHRRequest.xhr.onload = () => {
                // 如果响应成功
                if (LwuXHRRequest.xhr.status === 200) {
                    // 返回响应数据
                    resolve(LwuXHRRequest.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${LwuXHRRequest.xhr.status}`));
                }
            };
            // 发送请求
            LwuXHRRequest.xhr.send();
        });
    }

    // 定义一个公共的 post 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 post 请求
    public post(url: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址 
            LwuXHRRequest.xhr.open('POST', url, true);
            // 设置请求头为json格式
            LwuXHRRequest.xhr.setRequestHeader('Content-Type', 'application/json');
            // 设置响应类型 为json 
            LwuXHRRequest.xhr.responseType = 'json';
            // 监听响应
            LwuXHRRequest.xhr.onload = () => {
                // 如果响应成功
                if (LwuXHRRequest.xhr.status === 200) {
                    // 返回响应数据
                    resolve(LwuXHRRequest.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${LwuXHRRequest.xhr.status}`));
                }
            };
            // 发送请求,并将data转换为JSON字符串
            LwuXHRRequest.xhr.send(JSON.stringify(data));
        });
    }

    // 定义一个公共的 put 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 put 请求
    public put(url: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址 
            LwuXHRRequest.xhr.open('PUT', url, true);
            // 设置请求头为json格式
            LwuXHRRequest.xhr.setRequestHeader('Content-Type', 'application/json');
            // 设置响应类型 为json 
            LwuXHRRequest.xhr.responseType = 'json';
            // 监听响应
            LwuXHRRequest.xhr.onload = () => {
                // 如果响应成功
                if (LwuXHRRequest.xhr.status === 200) {
                    // 返回响应数据
                    resolve(LwuXHRRequest.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${LwuXHRRequest.xhr.status}`));
                }
            };
            // 发送请求,并将data转换为JSON字符串
            LwuXHRRequest.xhr.send(JSON.stringify(data));
        });
    }

    // 定义一个公共的 delete 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 delete 请求
    public delete(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址 
            LwuXHRRequest.xhr.open('DELETE', url, true);
            // 设置响应类型 为json 
            LwuXHRRequest.xhr.responseType = 'json';
            // 监听响应
            LwuXHRRequest.xhr.onload = () => {
                // 如果响应成功
                if (LwuXHRRequest.xhr.status === 200) {
                    // 返回响应数据
                    resolve(LwuXHRRequest.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${LwuXHRRequest.xhr.status}`));
                }
            };
            // 发送请求
            LwuXHRRequest.xhr.send();
        });
    }

    // 定义一个公共的 head 方法，接收请求地址和请求参数，返回一个 Promise 对象，实现 head 请求
    public head(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址 
            LwuXHRRequest.xhr.open('HEAD', url, true);
            // 设置响应类型 为json 
            LwuXHRRequest.xhr.responseType = 'json';
            // 监听响应
            LwuXHRRequest.xhr.onload = () => {
                // 如果响应成功
                if (LwuXHRRequest.xhr.status === 200) {
                    // 传入响应头信息
                    resolve(LwuXHRRequest.xhr.getAllResponseHeaders());
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${LwuXHRRequest.xhr.status}`));
                }
            };
            // 发送请求
            LwuXHRRequest.xhr.send();
        });
    }

    // 发送options请求
    public options(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址 
            LwuXHRRequest.xhr.open('OPTIONS', url, true);
            // 设置响应类型 为json 
            LwuXHRRequest.xhr.responseType = 'json';
            // 监听响应
            LwuXHRRequest.xhr.onload = () => {
                // 如果响应成功
                if (LwuXHRRequest.xhr.status === 200) {
                    // 传入响应头信息
                    resolve(LwuXHRRequest.xhr.getAllResponseHeaders());
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${LwuXHRRequest.xhr.status}`));
                }
            };
            // 发送请求
            LwuXHRRequest.xhr.send();
        });
    }

    // 发送patch请求
    public patch(url: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // 设置请求方法和请求地址 
            LwuXHRRequest.xhr.open('PATCH', url, true);
            // 设置请求头为json格式
            LwuXHRRequest.xhr.setRequestHeader('Content-Type', 'application/json');
            // 设置响应类型 为json 
            LwuXHRRequest.xhr.responseType = 'json';
            // 监听响应
            LwuXHRRequest.xhr.onload = () => {
                // 如果响应成功
                if (LwuXHRRequest.xhr.status === 200) {
                    // 返回响应数据
                    resolve(LwuXHRRequest.xhr.response);
                } else {
                    // 返回响应错误信息
                    reject(new Error(`请求失败：${LwuXHRRequest.xhr.status}`));
                }
            };
            // 发送请求,并将data转换为JSON字符串
            LwuXHRRequest.xhr.send(JSON.stringify(data));
        });
    }
}