/* JS语言工具类 */

/**
 *  深拷贝工具
 * @param obj 深拷贝对象或数组
 */
export const deepClone = (obj: object | any[] = {}) => {
   return JSON.parse(JSON.stringify(obj));
};
