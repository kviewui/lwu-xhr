import { IRequest } from "src/types";
import { Singleton } from "./singleton";
import { RequestLibraryImpl } from "./request";
import { ErrorHandlerDecorator, InterceptorDecorator, TimeoutDecorator } from "./decorator";

/**
 * 工厂函数，用来创建一个请求库实例 
 * @param options - 配置项 
 * @param options.useInterceptor - 是否使用拦截器
 * @param options.useTimeout - 是否使用超时处理
 * @param options.useErrorHandler - 是否使用错误处理
 * @returns {IRequest} 返回一个请求库实例
 * @export
 * @example
 * ```ts
 * // 引入 create 函数
 * import { create } from 'lwu-xhr';
 * 
 * // 创建一个请求库实例
 * const request = create({
 *  useInterceptor: true,
 *  useTimeout: true,
 *  useErrorHandler: true
 * });
 * 
 * // 使用拦截器
 * request.requestInterceptor((config) => {
 *  // 在请求前做一些处理
 *  return config;
 * });
 * 
 * // 使用超时处理
 * request.timeout(1000, (url) => {
 *  // 超时后的处理逻辑
 * });
 * 
 * // 使用错误处理
 * request.errorHandler((error) => {
 *  // 错误处理逻辑
 * });
 * 
 * request.get('https://www.baidu.com').then((response) => {});
 * request.post('https://www.baidu.com', { name: 'lwu' }).then((response) => {});
 * request.put('https://www.baidu.com', { name: 'lwu' }).then((response) => {});
 * request.delete('https://www.baidu.com').then((response) => {});
 * request.head('https://www.baidu.com').then((response) => {});
 * request.options('https://www.baidu.com').then((response) => {});
 * request.request({ url: 'https://www.baidu.com' }).then((response) => {});
 * ```
 */
export function create(options?: {
    useInterceptor?: boolean;
    useTimeout?: boolean;
    useErrorHandler?: boolean;
}): IRequest {
    // 获取一个 XMLHttpRequest 实例
    let xhr = Singleton.getInstance().getXHR();
    // 创建一个请求库实例
    let requestLib = new RequestLibraryImpl(xhr);
    // 如果 useInterceptor 为 true，则为请求库实例添加拦截器
    if (options && options.useInterceptor) {
        return new InterceptorDecorator(requestLib);
    }

    // 如果 useTimeout 为 true，则为请求库实例添加超时处理逻辑
    if (options && options.useTimeout) {
        return new TimeoutDecorator(requestLib);
    }

    // 如果 useErrorHandler 为 true，则为请求库实例添加错误处理逻辑
    if (options && options.useErrorHandler) {
        return new ErrorHandlerDecorator(requestLib);
    }

    // 如果都不为 true，则直接返回请求库实例
    return requestLib;
}