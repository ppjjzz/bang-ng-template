import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { delay, switchMap } from 'rxjs/operators';

/* 预加载所有路由模块 */
@Injectable()
export class PreloadRoutersService implements PreloadingStrategy {

    constructor() { }
    preload(route: Route, fn) {
        /* 延迟5秒预加载所有路由模块 */
        return Observable.create(obs => obs.next(true)).pipe(delay(5000), switchMap(() => fn()));
    }
}
