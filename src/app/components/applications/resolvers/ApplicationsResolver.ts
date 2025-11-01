import { Injectable } from "@angular/core";
import { ApplicationStore } from "../store/applications.store";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ApplicationMapper } from "../models/ApplicationMapper";
import { Observable, tap } from "rxjs";
import { Application } from "../contracts/Application";

@Injectable({providedIn: 'root'})
export class ApplicationsResolver {
    constructor(private store: ApplicationStore) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Application[]> {
        this.store.setIndex([]);
        this.store.setShow(new ApplicationMapper().make());
        return this.store.getIndex().pipe(
            tap(applications => this.store.setIndex(applications))
        );
    }
}