import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

/* 环境配置 */
export const ENVIRONMENT = environment;

/* api接口配置 */
export const API_ROOT = environment.API_DOMAIN;

/* 配置全局请求头信息
{
    withCredentials: false
}
*/
export interface HttpOptions {
    headers?: HttpHeaders | {[header: string]: string | string[]};
    params?: HttpParams | {[param: string]: string | string[]};
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

export const HTTP_OPTIONS: HttpOptions = null;
