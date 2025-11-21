import { Injectable } from "@angular/core";
import { AuthStore } from "../store/auth.store";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class LoginResolver implements Resolve<void> {
    constructor(private store: AuthStore) {}

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> {
        const externalAppName = router.queryParamMap.get('appName');
        const externalAppUrl = router.queryParamMap.get('appUrl');
        this.store.setExternalAppName(externalAppName);
        this.store.setExternalAppUrl(externalAppUrl);
        return of(void 0);
    }
}