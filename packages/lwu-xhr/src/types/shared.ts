export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';

/**
 * 请求的回调参数
 */
export interface ResolveCallback {
    data: object;
    statusCode?: number | string;
    statusText?: string;
    headers?: object;
    request?: XMLHttpRequest;
};

/**
 * 定义拦截器接口，声明请求前和请求后的处理方法
 */
export interface Interceptor {
    request?: (config: object) => any; // 请求前的处理方法，可以修改或返回请求配置
    response?: (data: any) => any; // 请求后的处理方法，可以修改或返回响应数据
}

/**
 * 定义请求库接口，声明请求方法和属性
 */
export interface IRequest {
    get(url: string, config?: object): Promise<any>;
    post(url: string, data?: any, config?: object): Promise<any>;
    put(url: string, data?: any, config?: object): Promise<any>;
    delete(url: string, config?: object): Promise<any>;
    head(url: string, config?: object): Promise<any>;
    options(url: string, config?: object): Promise<any>;
    patch(url: string, data?: any, config?: object): Promise<any>;
    timeout: number; // 超时时间，单位毫秒
    interceptors: Interceptor[]; // 拦截器数组，可以添加多个拦截器
}

// /**
//  * 定义请求装饰器接口，继承 IRequest 接口
//  */
// export interface IRequestDecorator extends IRequest {};