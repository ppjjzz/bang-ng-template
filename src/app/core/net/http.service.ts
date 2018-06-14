import {
  Injectable
} from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_OPTIONS, HttpOptions, API_ROOT } from './../core.contants';
import { IHttpResponse } from '@core/net/HttpResponse';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) { }
  /**
   * post方法
   * @param {string} url  请求地址,必填
   * @param {string} body 请求参数,非必填
   * @param {RequestOptionsArgs} options 请求头选项,非必填
   * @returns {Observable<any>} 返回可观察对象
   * @memberof HttpService
   */
  post(url: string, body?: any | null, options?: HttpOptions): Observable<IHttpResponse<any>>;
  post<T>(url: string, body?: any | null, options?: HttpOptions): Observable<IHttpResponse<T>>;
  post(url: string, body?: any | null, options?: HttpOptions): Observable<any> {
    const _options: any = this.setRequiresOptions(options);
    return this.http.post(url, body ? body : {}, _options);
  }
  
  /**
   * get方法
   * @param url 请求路径地址,必填
   * @param body 请求参数,非必填
   * @param options 请求头选项,非必填
   * @returns {Observable<>} 返回可观察对象
   */
  get(url: string, body?: object, options?: HttpOptions): Observable<IHttpResponse<any>>;
  get<T>(url: string, body?: object, options?: HttpOptions): Observable<IHttpResponse<T>>;
  get(url: string, body?: object, options?: HttpOptions): Observable<any> {
    let _options: any = this.setRequiresOptions(options);
    const params = this.parseParams(body);
    _options = {
      ..._options,
      params
    };
    return this.http.get(url, _options);
  }
  /**
   * get参数格式化
   * @param params 请求参数
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
   * 获取环境对应的请求域名
   * @param {string} key 默认为default
   */
  getDomain(key: string = 'default'): string {
    return API_ROOT[key];
  }
}
