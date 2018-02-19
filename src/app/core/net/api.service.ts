import {
  Injectable
} from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HTTP_OPTIONS, HttpOptions } from './../core.contants';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }
  /**
   * post方法
   * @param {string} url  请求地址,必填
   * @param {string} body 请求参数,非必填
   * @param {RequestOptionsArgs} options 请求头选项,非必填
   * @returns {Observable<any>} 返回可观察对象
   * @memberof ApiService
   */
  post(url: string, body?: any, options?: HttpOptions): Observable<any> {
    const _options = this.setRequiresOptions(options);
    return this.http.post(url, body ? body : {}, _options);
  }
  /**
   * get方法
   * @param url 请求路径地址,必填
   * @param body 请求参数,非必填
   * @param options 请求头选项,非必填
   * @returns {Observable<>} 返回可观察对象
   */
  get(url: string, body?: object, options?: HttpOptions): Observable<any> {
    let _options = this.setRequiresOptions(options);
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
}
