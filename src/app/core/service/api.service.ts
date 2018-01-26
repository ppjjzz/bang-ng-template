import {
  Injectable
} from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { CookieService } from './cookie';
import { ApiConfig, ApiUrl } from './config.api';
import { HTTP_OPTIONS, HttpOptions } from './../core.contants';

@Injectable()
export class ApiService {
  private baseUrl = '';
  private ApiUrl: ApiUrl;
  constructor(
    private http: HttpClient,
    private cookieSer: CookieService,
    private apiConfig: ApiConfig,
  ) {
    this.ApiUrl = this.apiConfig.load();

  }
  /**
   * 设置请求服务器基路径，如 http://localhost:3000
   *
   * @param {string} url 如果输入值在环境变量中有配置则取设置预设值,否则取输入值作为基路径
   * @returns
   * @memberof ApiService
   */
  setBaseUrl(url: string) {
    this.baseUrl = this.ApiUrl[url] || url;
    return this;
  }
  /**
   * post方法
   * @param {string} url  请求地址
   * @param {string} body
   * @param {RequestOptionsArgs} [options]
   * @param {boolean} [hideLoading]
   * @returns {Observable<any>} 返回可观察对象
   * @memberof ApiService
   */
  post(url: string, body?: any, options?: HttpOptions, hideLoading?: boolean): Observable<any> {
    const _options = this.setRequiresOptions(options);
    return this.http.post(this.getFullUrl(url), body ? body : {}, _options);
  }
  /**
   * get方法
   * @param url 必填，路径地址
   * @param body 查询条件
   * @param options 请求参数自定义
   * @returns {Observable<>}
   */
  get(url: string, body?: object, options?: HttpOptions): Observable<any> {
    let _options = this.setRequiresOptions(options);
    const params = this.parseParams(body);
    _options = {
      ..._options,
      params
    };
    return this.http.get(this.getFullUrl(url), _options);
  }
/**
 * get参数格式化
 * @param params
 */
  parseParams(params: object): HttpParams {
    let ret = new HttpParams();
    if (params) {
      for (const key in params) {
        if (key) {
          const _data = params[key];
          ret = ret.set(key, _data);
        }
      }
    }
    return ret;
  }
  setRequiresOptions(options: HttpOptions = {}) {
    return {
      ...HTTP_OPTIONS,
      ...options
    };
  }

  /**
   * Build API url
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    // return full URL to API here
    return this.baseUrl + url;
  }
}
