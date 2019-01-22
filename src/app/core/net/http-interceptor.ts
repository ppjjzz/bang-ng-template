
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable ,  throwError as _throw } from 'rxjs';
import { tap, mergeMap, finalize, catchError } from 'rxjs/operators';
import * as NProgress from 'nprogress';
import { INTERCEPTOR_WHITE_LIST } from './interceptor-white-list';

/**
 * @export 返回拦截器类
 */
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {
  }
  intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    NProgress.start(); // 显示顶部加载进度条
    /* 设置全局的请求头 */
    const newReq = req.clone({
    });
    return next.handle(newReq).pipe(
      tap((res: any) => {
      })
      , mergeMap((event: any) => {
        const IS_REQUEST_WHITE_LIST = INTERCEPTOR_WHITE_LIST.some(x => {
          return newReq.url.includes(x);
        });
        if (event instanceof HttpResponse && (event.status !== 200 || (!event.body.success && !IS_REQUEST_WHITE_LIST))) {
          return Observable.create(observer => observer.error(event));
        }
        if (event instanceof HttpResponse) {
          NProgress.done();
        }
        return Observable.create(observer => observer.next(event));
      })
      , catchError((res: HttpResponse<any>) => {
        NProgress.done();
        switch (res.status) {
          case 401:
            // 拦截到401错误
            window.top.location.reload(); // 刷新最外层页面
            break;
          case 200:
            // 业务层级错误处理
            if (res.body.msg) {
              // const params = req.method === 'POST' ? JSON.stringify(req.body) : null;
            }
            break;
          case 404:

            break;
          case 500:

            break;
          default:

            break;
        }
        return _throw(res);
      }), finalize(() => {

      })
    ) as Observable<HttpEvent<any>>;
  }
}

