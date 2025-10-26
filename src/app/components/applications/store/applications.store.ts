import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ApiSuccessHandlerService } from '../../../core/http/api-success-handler.service';
import { ApiErrorHandlerService, ApiErrorResult } from '../../../core/http/api-error-handler.service';
import { Application } from '../models/application';
import { ApplicationResponseContract } from '../contracts/application_response';

@Injectable({ providedIn: 'root' })

export class ApplicationStore {
    constructor(
        private http: HttpClient,
        private apiSuccessHandler: ApiSuccessHandlerService,
        private apiErrorHandler: ApiErrorHandlerService
    ) {}

    private _index = signal<Application[]>([]);
    private _show = signal<Application | null>(null);

    // expose readonly signals
    readonly index = this._index.asReadonly();
    readonly show = this._show.asReadonly();

    // derived/computed signals
    // readonly isLoggedIn = computed(() => !!this._accessToken());

    // setters
    setIndex(raw: ApplicationResponseContract[]) {
        this._index.set([]);
        const apps = raw.map(rawApplication => new Application(rawApplication));
        this._index.set(apps);
    }

    setShow(application: Application | null = null):void {
        this._show.set(application);
    }

    async getIndex(): Promise<ApiErrorResult | boolean> {
        const url = 'http://localhost:9025/api/applications';

        try {
            const response = await firstValueFrom(
                this.http.get<ApplicationResponseContract[]>(url, { observe: 'response' })
            );
            const applications = response.body ?? [];
            this.setIndex(applications);
            this.apiSuccessHandler.handle(response, 'Applications index loaded successfully.');
            return true;
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                return this.apiErrorHandler.handle(error);
            }
            console.error('Unexpected error: ' + error);
            return false;
        }
    }

    async getApplication(id: number): Promise<ApiErrorResult | boolean> {
        const url = 'http://localhost:9025/api/applications/' + id;
        try {
            const response = await firstValueFrom(
                this.http.get<ApplicationResponseContract>(url, {observe: 'response'})
            );
            if (response.body) {
                const application = new Application(response.body);
                this._show.set(application);
                this.apiSuccessHandler.handle(response, 'Application loaded successfully.');
                return true;
            }
            return true;
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                return this.apiErrorHandler.handle(error);
            }
            console.error('Unexpected error: ' + error);
            return false;
        }
    }
}
