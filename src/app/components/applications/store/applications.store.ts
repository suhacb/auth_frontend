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

    testApi(application: Application, options = {observe: 'response'}): void {
        console.log('testApi');
    }
    // testApi(application: Application, options = {observe: 'response'}): void {
    //     const url = `http://localhost:9025/api/applications/${application.id}`;
    //     toSignal<Application>(this.sendRequest<ApplicationApiResource, Application>('GET', url, new ApplicationMapper()));
// 
    //     // console.log(response);
    //     // const response = this.handleResponse<ApplicationApiResource>(observable);
    //     // this.sendRequest<Application>('POST', url, application);
    //     // this.sendRequest<Application>('DELETE', url);
    //     // this.sendRequest<Application>('PUT', url, application);
    //     // const observable: Observable<HttpResponse<ApplicationApiResource>> = this.http.get<ApplicationApiResource>(url, {observe: 'response'});
    //     // this.handleResponse(observable);
    //     // return observable;
    // }
// 
    // private sendRequest<apiStructure, appStructure>(
    //     method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    //     url: string,
    //     mapper: any,
    //     payload?: appStructure
    // ): appStructure {
    //     let options: {
    //         observe: 'response';
    //         body?: any;
    //     } = { observe: 'response' };
    //     if ((method === 'POST' || method === 'PUT')) {
    //         options.body = mapper.toApi(payload);
    //     }
// 
    //     const response: Observable<HttpResponse<apiStructure>> = this.http.request<apiStructure>(method, url, options);
    //     response.subscribe({
    //         next: (response: HttpResponse<apiStructure>): appStructure => {
    //             return mapper.toApp(response.body);
    //         },
    //         error: (error) => {
    //             console.log(error);
    //         }
    //     });
    // }

    // private handleResponse<apiResponseStructure>(observable: Observable<HttpEvent<HttpResponse<apiResponseStructure>>>) {
    //     // show API returns instance of application as ApplicationApiResource
    //     // index API returns an array of applications as ApplicationApiResource[]
    //     // update API returns instance of application as ApplicationApiResource
    //     // delete API returns null
    //     // store API returns instance of application as ApplicationApiResource
    //     observable.subscribe((response) => {
    //         if (response.ok) {
    //             console.log('response ok');
    //         } else {
    //             console.log('error');
    //         }
    //     });
    // }
}
