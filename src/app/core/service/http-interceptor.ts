
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';



import { HttpInterceptor } from '@angular/common/http';

/**
 * @export 返回拦截器类
 */
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {
  }
  intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    /* 设置全局的请求头 */
    const jwtReq = req.clone({
    });
    return next.handle(jwtReq)
      .do((res: any) => {
      })
      .mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.status !== 200 || !event.body.success) {
          return Observable.create(observer => observer.error(event));
        }
        return Observable.create(observer => observer.next(event));
      })
      .catch((res: HttpResponse<any>) => {
        switch (res.status) {
          case 401:
            // 拦截到401错误
            break;
          case 200:
            // 业务层级错误处理
            break;
          case 404:

            break;
        }
        return Observable.throw({ res, 'error': '0' });
      }).finally(() => {

      });
  }
}

