

/* JS语言工具类 */

/**
 *  深拷贝工具
 * @param obj 深拷贝对象或数组
 */
export const deepClone = (obj: object | any[] = {}) => {
   return JSON.parse(JSON.stringify(obj));
};

/**
 * 验证字段值是否为空
 * @param {any} data 要验证的字段值
 * @returns {boolean} 为空返回false,不为空返回true
 */
export const isNotEmpty = (data: any): boolean => {
    if (data === null || data === undefined) {
        return false;
    }
    if (typeof data === 'string' && data.trim() === '') {
        return false;
    }
    if (Array.isArray(data) && !data.length) {
        return false;
    }
    return true;
};

/**
 * 获取字段应有类型对应的值
 * @param {any} data 传入后台返回字段数据
 * @param {string} type 传入字段应有类型
 */
export const getRealTypeVal = (data: any, type: 'string' | 'object' | 'array') => {
    if (data !== null || data !== undefined) {
        return data;
    }
    switch (type) {
        case 'string':
        return '';
        case 'object':
        return {};
        case 'array':
        return [];
    }
};
