import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpInterceptorService } from '../services/http-interceptor.service';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
];
