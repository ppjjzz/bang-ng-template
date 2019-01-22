import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '@core/net/http-interceptor';



export const NET_SERVICES: Provider = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
];
