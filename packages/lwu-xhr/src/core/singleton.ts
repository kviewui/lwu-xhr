/**
 * 定义一个单例类，用来创建和共享 XMLHttpRequest 实例
 */
export class Singleton {
    /**
     * 静态私有属性，用来存储 XMLHttpRequest 实例
     */
    private static xhr: XMLHttpRequest;

    /**
     * 私有的构造函数，防止外部创建实例
     */
    private constructor() {}

    /**
     * 定义一个公共的静态方法，用来获取 XMLHttpRequest 实例，如果实例不存在，则创建一个新的实例
     */
    public static getInstance(): XMLHttpRequest {
        if (!Singleton.xhr) {
            Singleton.xhr = new XMLHttpRequest();
        }
        return Singleton.xhr;
    }
}