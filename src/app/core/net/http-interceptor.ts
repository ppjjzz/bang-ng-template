
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap, mergeMap, finalize, catchError } from 'rxjs/operators';



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
    const newReq = req.clone({
    });
    return next.handle(newReq).pipe(
      tap((res: any) => {
      })
      , mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.status !== 200 || !event.body.success) {
          return Observable.create(observer => observer.error(event));
        }
        return Observable.create(observer => observer.next(event));
      })
      , catchError((res: HttpResponse<any>) => {
        switch (res.status) {
          case 401:
            // 拦截到401错误
            window.top.location.reload(); // 刷新最外层页面
            break;
          case 200:
            // 业务层级错误处理
            break;
          case 404:

            break;
        }
        return Observable.throw({ res, 'error': '0' });
      }), finalize(() => {

      })
    );
  }
}

