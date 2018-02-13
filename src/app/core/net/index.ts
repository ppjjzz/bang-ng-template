import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from './cookie';
import { ApiService } from './api.service';
import { HttpInterceptorService } from './http-interceptor';
import { ApiConfig } from './api.config';



export const NET_SERVICES: Provider = [
    ApiService,
    ApiConfig,
    CookieService,
    HttpInterceptorService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
];
