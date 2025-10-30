import { Injectable } from "@angular/core";
import { ApplicationStore } from "../store/applications.store";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Application } from "../models/application";
import { ApiErrorResult } from "../../../core/http/api-error-handler.service";

@Injectable({providedIn: 'root'})
export class ApplicationResolver {
    constructor(private store: ApplicationStore, private router: Router) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        this.store.setShow(new Application());
        try {
            await this.store.getApplication(Number(route.params['id']));
        } catch (error) {
            console.log(error);
            console.log('Should redirect');
            await this.router.navigate(['/applications']);
        }
        
    }
}