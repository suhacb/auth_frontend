import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, firstValueFrom, map, Observable, throwError } from 'rxjs';
import { ApiSuccessHandlerService } from '../../../core/http/api-success-handler.service';
import { ApiErrorHandlerService, ApiErrorResult } from '../../../core/http/api-error-handler.service';
import { Application, ApplicationApiPayload, ApplicationApiResource } from '../contracts/Application';
import { ApplicationMapper } from '../models/ApplicationMapper';
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
    setIndex(response: ApplicationApiResource[]) {
        this._index.set([]);
        const applications = response.map(application => new ApplicationMapper().toApp(application));
        this._index.set(applications);
    }

    setShow(application: Application):void {
        this._show.set(application);
    }

    async getIndex(): Promise<ApiErrorResult | boolean> {
        const url = 'http://localhost:9025/api/applications';

        try {
            const response = await firstValueFrom(
                this.http.get<ApplicationApiResource[]>(url, { observe: 'response' })
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
                this.http.get<ApplicationApiResource>(url, {observe: 'response'})
            );
            if (response.body) {
                const application = new ApplicationMapper().toApp(response.body);
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

//     async updateApplication(id: number, application: Application): Promise<ApiErrorResult | boolean> {
//          const url = 'http://localhost:9025/api/applications/' + id;
//          const data: ApplicationApiPayload = new ApplicationMapper().toApi(application);
//          try {
//              const response = await firstValueFrom(
//                  this.http.put<ApplicationApiResource>(url, data, {observe: 'response'})
//              );
//              if (response.body) {
//                  this.setShow(new ApplicationMapper().toApp(response.body));
//                  this.apiSuccessHandler.handle(response, 'Application updated successfully.');
//                  return true;
//              }
//              return true;
//          } catch (error) {
//              if (error instanceof HttpErrorResponse) {
//                  return this.apiErrorHandler.handle(error);
//              }
//              console.error('Unexpected error: ' + error);
//              return false;
//          }
//     }

    updateApplication(id: number, application: Application): Observable<Application> {
        const url = `http://localhost:9025/api/applications/${id}`;
        const payload: ApplicationApiPayload = new ApplicationMapper().toApi(application);
        console.log(payload);

        return this.http.put<ApplicationApiResource>(url, payload).pipe(
            map((res: ApplicationApiResource) => {
                const application = new ApplicationMapper().toApp(res);
                this.setShow(application);
                return application;
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Update failed', error);
                return throwError(() => error);
            })
        );
    }

    async deleteApplication(id: string | number): Promise<ApiErrorResult | boolean>
    {
        const url = 'http://localhost:9025/api/applications/' + Number(id);
        try {
            const response = await firstValueFrom(
                this.http.delete<ApplicationApiResource>(url, {observe: 'response'})
            );
            if (response.ok) {
                this.apiSuccessHandler.handle(response, 'Application deleted successfully.');
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

    async storeApplication(application: Application): Promise<ApiErrorResult | boolean> {
        const url = 'http://localhost:9025/api/applications';
        try {
            const response = await firstValueFrom(
                this.http.post<ApplicationApiResource>(url, new ApplicationMapper().toApi(application), {observe: 'response'})
            );
            if (response.ok) {
                this.apiSuccessHandler.handle(response, 'Application created successfully.');
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
