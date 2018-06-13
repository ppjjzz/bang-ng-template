import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

/* 环境配置 */
export const ENVIRONMENT = environment;

/* api接口配置 */
export const API_ROOT = environment.API_DOMAIN;



export interface HttpOptions {
    headers?: HttpHeaders | {[header: string]: string | string[]};
    params?: HttpParams | {[param: string]: string | string[]};
    observe?: 'body' | 'events' | 'response';
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}

/* 配置全局请求头信息 */
export const HTTP_OPTIONS: HttpOptions = null;
