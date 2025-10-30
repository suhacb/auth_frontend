import { Injectable } from "@angular/core";
import { ApplicationStore } from "../store/applications.store";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ApplicationsResolver {
    constructor(private store: ApplicationStore) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.setIndex([]);
        this.store.getIndex();
    }
}