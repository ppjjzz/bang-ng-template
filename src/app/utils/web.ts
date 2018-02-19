/* web操作工具类 */

import * as WebStorageCache from 'web-storage-cache';
/**
 * 本地存储操作工具类
*/


/* WebStorageCache 对HTML5 localStorage 和sessionStorage 进行了扩展，
添加了超时时间，序列化方法。可以直接存储json对象，
同时可以非常简单的进行超时时间的设置。
API 参考https://github.com/WQTeam/web-storage-cache
*/
export const ssCache = new WebStorageCache({
    storage: 'sessionStorage'
});
export const lsCache = new WebStorageCache();
