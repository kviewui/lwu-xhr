import { LWURequest, createRequestDecorator } from './core';

/**
 * 获取请求类的实例 
 */
export const getRequestInstance = () => {
    return LWURequest;
};

/**
 * 获取请求装饰器类的实例
 */
export const getRequestDecoratorInstance = () => {
    return createRequestDecorator;
};

/**
 * 通过工厂函数，传入 Request 类的实例，获取一个新的对象
 */
export const requestDecorator = createRequestDecorator(LWURequest);