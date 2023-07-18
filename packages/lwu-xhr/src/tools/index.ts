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