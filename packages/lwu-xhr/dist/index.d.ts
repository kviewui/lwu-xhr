/**
 * 定义请求库接口，声明请求方法
 */
interface IRequest {
    get(url: string, config?: object): Promise<any>;
    post(url: string, data?: any, config?: object): Promise<any>;
    put(url: string, data?: any, config?: object): Promise<any>;
    delete(url: string, config?: object): Promise<any>;
    head(url: string, config?: object): Promise<any>;
    options(url: string, config?: object): Promise<any>;
    patch(url: string, data?: any, config?: object): Promise<any>;
}

declare class LwuXHRRequest implements IRequest {
    private xhr;
    constructor();
    get(url: string): Promise<any>;
    post(url: string, data?: any): Promise<any>;
    put(url: string, data?: any): Promise<any>;
    delete(url: string): Promise<any>;
    head(url: string): Promise<any>;
    options(url: string): Promise<any>;
    patch(url: string, data?: any): Promise<any>;
}

interface IRequestDecorator extends IRequest {
    useRequestInterceptor(requestInterceptor: Function): void;
    useResponseInterceptor(responseInterceptor: Function): void;
}

/**
 * 获取请求类的实例
 */
declare const getRequestInstance: () => LwuXHRRequest;
/**
 * 获取请求装饰器类的实例
 */
declare const getRequestDecoratorInstance: () => (request: LwuXHRRequest) => IRequestDecorator;
/**
 * 通过工厂函数，传入 Request 类的实例，获取一个新的对象
 */
declare const requestDecorator: IRequestDecorator;

export { getRequestDecoratorInstance, getRequestInstance, requestDecorator };
