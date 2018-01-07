import { Provider } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from './cookie';
import { ApiService } from './api.service';
import { HttpInterceptorService } from './http-interceptor';
import { ApiConfig } from './config.api';



export const CORE_SERVICES: Provider = [
    ApiService,
    ApiConfig,
    CookieService,
    HttpInterceptorService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
];
