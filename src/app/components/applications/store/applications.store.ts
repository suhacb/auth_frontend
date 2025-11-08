import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, EMPTY, firstValueFrom, map, Observable, tap, throwError } from 'rxjs';
import { ApiSuccessHandlerService } from '../../../core/http/api-success-handler.service';
import { ApiErrorHandlerService, ApiErrorResult } from '../../../core/http/api-error-handler.service';
import { Application, ApplicationApiPayload, ApplicationApiResource } from '../contracts/Application';
import { ApplicationMapper } from '../models/ApplicationMapper';
import { toSignal } from '@angular/core/rxjs-interop';
// import { Application } from '../models/application';
// import { ApplicationApiResource } from '../contracts/ApplicationApiResource';
// import { ApplicationResource } from '../contracts/ApplicationResource';

@Injectable({ providedIn: 'root' })

export class ApplicationStore {
    constructor(
        private http: HttpClient,
        private apiSuccessHandler: ApiSuccessHandlerService,
        private apiErrorHandler: ApiErrorHandlerService
    ) {}

    private _index = signal<Application[]>([]);
    private _show = signal<Application>(new ApplicationMapper().make())

    // expose readonly signals
    readonly index = this._index.asReadonly();
    readonly show = this._show.asReadonly();

    // setters
    setIndex(applications: Application[]) {
        this._index.set(applications);
    }

    setShow(application: Application):void {
        this._show.set(application);
    }

    getIndex(): Observable<Application[]> {
    const url = 'http://localhost:9025/api/applications';

    return this.http.get<ApplicationApiResource[]>(url).pipe(
        map((res: ApplicationApiResource[]) => {
            const applications: Application[] = res.map(
                (apiApp: ApplicationApiResource) => new ApplicationMapper().toApp(apiApp)
            );
            this.setIndex(applications);
            return applications;
        }),
            catchError((error: HttpErrorResponse) => {
            return throwError(() => error);
        }));
    }

    getApplication(id: number): Observable<Application> {
        const url = `http://localhost:9025/api/applications/${id}`;
        return this.http.get<ApplicationApiResource>(url).pipe(
            map((res: ApplicationApiResource) => {
                const application = new ApplicationMapper().toApp(res);
                this.setShow(application);
                return application;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }

    updateApplication(application: Application, updatedApplication: Application): Observable<HttpResponse<any>> {
        const url = `http://localhost:9025/api/applications/${application.id}`;
        const payload = new ApplicationMapper().toApi(updatedApplication);

        return this.http.put<ApplicationApiResource>(url, payload, {observe: 'response'}).pipe(
            tap((response: HttpResponse<ApplicationApiResource>) => {
                if (response && response.body) {
                    this.apiSuccessHandler.handle(response, `Application ${response.body?.name} updated successfully.`);
                    const application = new ApplicationMapper().toApp(response.body);
                    this.setShow(application);
                }
            }),
            catchError((error: HttpErrorResponse) => {
                const handled = this.apiErrorHandler.handle(error);

                // Re-throw all errors to let the Page handle 422 or others if needed
                if (error.status === 422) {
                    return throwError(() => error);
                }

                return EMPTY;
            })
        );
    }

    deleteApplication(application: Application, options = {observe: 'response'}): Observable<HttpResponse<any>>
    {
        const url = `http://localhost:9025/api/applications/${application.id}`;
        return this.http.delete<HttpResponse<any>>(url);
    }

    storeApplication(application: Application): Observable<HttpResponse<any>> {
        const url = 'http://localhost:9025/api/applications';
        const payload = new ApplicationMapper().toApi(application);
        return this.http.post<ApplicationApiResource>(url, payload, {observe: 'response'}).pipe(
            tap((response: HttpResponse<ApplicationApiResource>) => {
                this.apiSuccessHandler.handle(response, `Application ${response.body?.name} created successfully.`);
            }),
            catchError((error: HttpErrorResponse) => {
                const handled = this.apiErrorHandler.handle(error);

                // Re-throw all errors to let the Page handle 422 or others if needed
                if (error.status === 422) {
                    return throwError(() => error);
                }

                return EMPTY;
            })
        );
    }
}
