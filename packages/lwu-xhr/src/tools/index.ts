/**
 * 将对象转换为查询字符串  
 * @param obj - 需要转换的对象 
 */
export const objToQueryString = (obj: { [x: string]: any; }) => {
    const keys = Object.keys(obj);
    const params = keys.map(key => {
        return `${key}=${obj[key]}`;
    });
    return params.join('&');
}

/**
 * 判断是否为json字符串 
 * @param str - 需要转换的字符串
 */
export const isJSON = (str: string): boolean => {
    if (typeof str === 'string') {
        try {
            const obj = JSON.parse(str);
            return typeof obj === 'object' && obj;
        } catch (e) {
            return false;
        }
    }
    return false; 
}

/**
 * 判断是否为空对象 
 * @param obj - 需要判断的对象
 */
export const isEmptyObject = (obj: any): boolean => {
    return Object.keys(obj).length === 0;
}

/**
 * 发布订阅类
 * @public
 */
export class PubSub {
    // 订阅者
    private subscribers: Record<string, Function[]>;

    constructor() {
        this.subscribers = {};
    }

    /**
     * 订阅事件 
     * @param event - 订阅的事件 
     * @param callback - 回调函数 
     */
    public subscribe(event: string, callback: Function) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    }

    /**
     * 取消订阅 
     * @param event - 取消订阅的事件 
     * @param callback - 回调函数 
     */
    public unsuscribe(event: string, callback: Function) {
        if (!this.subscribers[event]) {
            return;
        }
        this.subscribers[event] = this.subscribers[event].filter(fn => fn !== callback);
    }

    /**
     * 发布事件 
     * @param event - 发布的事件     
     * @param data - 发布的数据  
     */
    public publish(event: string, data: any) {
        // console.log('publish', event, data); 
        if (!this.subscribers[event]) {
            return;
        }
        this.subscribers[event].forEach(fn => fn(data));
    }
}