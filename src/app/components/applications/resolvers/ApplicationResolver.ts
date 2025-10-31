import { Injectable } from "@angular/core";
import { ApplicationStore } from "../store/applications.store";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { ApplicationMapper } from "../models/ApplicationMapper";

@Injectable({providedIn: 'root'})
export class ApplicationResolver {
    constructor(private store: ApplicationStore, private router: Router) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        this.store.setShow(new ApplicationMapper().make());
        try {
            await this.store.getApplication(Number(route.params['id']));
        } catch (error) {
            await this.router.navigate(['/applications']);
        }
        
    }
}