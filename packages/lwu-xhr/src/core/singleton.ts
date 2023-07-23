/**
 * 定义一个单例类，用来创建和共享 XMLHttpRequest 实例
 * @export
 * @class Singleton
 */
export class Singleton {
    /**
     * 静态私有属性，用来存储 XMLHttpRequest 实例
     * @private
     * @static
     * @type {XMLHttpRequest}
     * @memberof Singleton
     */
    private static instance: Singleton;
    /**
     * 私有的 XMLHttpRequest 实例
     * @private
     * @type {XMLHttpRequest}
     * @memberof Singleton
     */
    private xhr: XMLHttpRequest;

    /**
     * 私有的构造函数，防止外部创建实例
     * @private
     * @memberof Singleton
     */
    private constructor() {
        this.xhr = new XMLHttpRequest();
    }

    /**
     * 定义一个公共的静态方法，用来获取 XMLHttpRequest 实例，如果实例不存在，则创建一个新的实例
     * @static
     * @returns {XMLHttpRequest}
     * @memberof Singleton
     */
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    /**
     * 定义一个公共的方法，用来获取 XMLHttpRequest 实例 
     * @returns {XMLHttpRequest} 
     * @memberof Singleton
     */
    public getXHR(): XMLHttpRequest {
        return this.xhr;
    }
}