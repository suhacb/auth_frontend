import { Injectable } from "@angular/core";
import { ApplicationStore } from "../store/applications.store";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { ApplicationMapper } from "../models/ApplicationMapper";
import { Observable, tap } from "rxjs";
import { Application } from "../contracts/Application";

@Injectable({providedIn: 'root'})
export class ApplicationResolver {
    constructor(private store: ApplicationStore, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Application> {
        this.store.setShow(new ApplicationMapper().make());
        
        return this.store.getApplication(Number(route.params['id'])).pipe(
            tap(application => this.store.setShow(application))
        );
    }
}