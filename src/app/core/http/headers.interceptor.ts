import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { APP_CONFIG } from "../../config/app-config";

export const appHeadersInterceptor: HttpInterceptorFn = (req, next) => {
    const cfg = inject(APP_CONFIG);

    const headers: Record<string, string> = {};

    if (cfg.appNameHeader) headers['X-Application-Name'] = cfg.appNameHeader;
    if (cfg.appBaseUrl) headers['X-Client-Url'] = cfg.appBaseUrl;

    return next(req.clone({ setHeaders: headers }));
}