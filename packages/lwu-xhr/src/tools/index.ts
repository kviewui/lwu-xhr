/**
 * @description: 将对象转换为查询字符串  
 * @param obj 需要转换的对象 
 */
export const objToQueryString = (obj: { [x: string]: any; }) => {
    const keys = Object.keys(obj);
    const params = keys.map(key => {
        return `${key}=${obj[key]}`;
    });
    return params.join('&');
}

/**
 * @description: 判断是否为json字符串 
 * @param str 需要转换的字符串
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