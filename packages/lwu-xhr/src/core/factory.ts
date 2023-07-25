import { IErrorHandlerDecorator, IInterceptorDecorator, IRequest, ITimeoutDecorator } from "src/types";
import { Singleton } from "./singleton";
import { RequestLibraryImpl } from "./request";
import { ErrorHandlerDecorator, InterceptorDecorator, TimeoutDecorator } from "./decorator";

/**
 * 工厂函数，用来创建一个请求库实例 
 * @param options - 配置项 
 * @param options.useInterceptor - 是否使用拦截器
 * @param options.useTimeout - 是否使用超时处理
 * @param options.useErrorHandler - 是否使用错误处理
 * @returns {IRequest | IErrorHandlerDecorator | IInterceptorDecorator | ITimeoutDecorator} 返回一个请求库实例
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
    /**
     * @description 是否使用拦截器
     */
    useInterceptor?: boolean;
    /**
     * @description 是否使用超时处理
     */
    useTimeout?: boolean;
    /**
     * @description 是否使用错误处理
     */
    useErrorHandler?: boolean;
    /**
     * @description 自定义装饰器
     */
    decorator?: any[];
}): IInterceptorDecorator | IRequest {
    // 获取一个 XMLHttpRequest 实例
    let xhr = Singleton.getInstance().getXHR();
    // 创建一个请求库实例
    let requestLib = new RequestLibraryImpl(xhr);
    // 如果 useInterceptor 为 true，则为请求库实例添加拦截器
    if (options && options.useInterceptor) {
        console.log('拦截器装饰器');
        return new InterceptorDecorator(requestLib);
        // libs = new InterceptorDecorator(requestLib);
    }

    // 如果 useTimeout 为 true，则为请求库实例添加超时处理逻辑
    // if (options && options.useTimeout) {
    //     console.log('超时处理装饰器');
    //     libs = new TimeoutDecorator(new InterceptorDecorator(libs));
    //     // return new TimeoutDecorator(requestLib);
    // }

    // // 如果 useErrorHandler 为 true，则为请求库实例添加错误处理逻辑
    // if (options && options.useErrorHandler) {
    //     console.log('错误处理装饰器');
    //     libs = new ErrorHandlerDecorator(libs);
    //     // return new ErrorHandlerDecorator(requestLib);
    // }

    // // 如果存在自定义装饰器，则为请求库实例添加自定义装饰器
    // if (options && options.decorator) {
    //     return options.decorator.reduce((requestLib, Decorator) => {
    //         // return new Decorator(requestLib);
    //         libs = new Decorator(requestLib);
    //     }, requestLib);
    // }

    // 如果都不为 true，则直接返回请求库实例
    return requestLib;
}