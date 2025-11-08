import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, tap, throwError } from 'rxjs';
import { ApiSuccessHandlerService } from '../../../core/http/api-success-handler.service';
import { ApiErrorHandlerService } from '../../../core/http/api-error-handler.service';
import { Application, ApplicationApiResource } from '../contracts/Application';
import { ApplicationMapper } from '../models/ApplicationMapper';

@Injectable({ providedIn: 'root' })
export class ApplicationStore {
    constructor(
        private http: HttpClient,
        private apiSuccessHandler: ApiSuccessHandlerService,
        private apiErrorHandler: ApiErrorHandlerService
    ) {}

    /**
     * Signal holding the list of all applications.
     * Private; use `index` for readonly access.
     */
    private _index = signal<Application[]>([]);

    /**
     * Signal holding the currently selected/displayed application.
     * Private; use `show` for readonly access.
     */
    private _show = signal<Application>(new ApplicationMapper().make());

    /**
     * Readonly signal exposing the list of all applications.
     */
    readonly index = this._index.asReadonly();

    /**
     * Readonly signal exposing the currently displayed application.
     */
    readonly show = this._show.asReadonly();

    // ────────────────────────────
    // State Setters
    // ────────────────────────────

    /**
     * Sets the list of applications in the `_index` signal.
     * @param applications Array of `Application` objects.
     */
    setIndex(applications: Application[]): void {
        this._index.set(applications);
    }

    /**
     * Sets the currently displayed application in the `_show` signal.
     * @param application The `Application` object to set as currently selected.
     */
    setShow(application: Application): void {
        this._show.set(application);
    }

    // ────────────────────────────
    // CRUD Methods
    // ────────────────────────────

    /**
     * Fetches all applications from the backend API.
     * Updates the `_index` signal with the retrieved list.
     * @returns Observable emitting the mapped array of `Application` objects.
     */
    getApplications(): Observable<Application[]> {
        const url = 'http://localhost:9025/api/applications';
        return this.http.get<ApplicationApiResource[]>(url).pipe(
            map((response) => {
                const applications = response.map(apiApp => new ApplicationMapper().toApp(apiApp));
                this.setIndex(applications);
                return applications;
            }),
            catchError((error: HttpErrorResponse) => throwError(() => error))
        );
    }

    /**
     * Fetches a single application by ID from the backend API.
     * Updates the `_show` signal with the retrieved application.
     * @param id ID of the application to fetch.
     * @returns Observable emitting the mapped `Application` object.
     */
    getApplication(id: number): Observable<Application> {
        const url = `http://localhost:9025/api/applications/${id}`;
        return this.http.get<ApplicationApiResource>(url).pipe(
            map((response) => {
                const application = new ApplicationMapper().toApp(response);
                this.setShow(application);
                return application;
            }),
            catchError((error: HttpErrorResponse) => throwError(() => error))
        );
    }

    /**
     * Creates a new application.
     * Shows a success message via `ApiSuccessHandlerService`.
     * Re-throws validation errors (422) for the Page/form to handle.
     * Updates nothing in `_index` or `_show`; you may call `getApplications()` to refresh list.
     * @param application Application object to create.
     * @returns Observable emitting the created `Application` mapped from API response body.
     */
    storeApplication(application: Application): Observable<Application> {
        const url = 'http://localhost:9025/api/applications';
        const payload = new ApplicationMapper().toApi(application);

        return this.http.post<ApplicationApiResource>(url, payload, { observe: 'response' as const }).pipe(
            tap((response: HttpResponse<ApplicationApiResource>) => {
                this.apiSuccessHandler.handle(response, `Application ${response.body?.name} created successfully.`);
            }),
            map((response: HttpResponse<ApplicationApiResource>) => {
                if (!response.body) throw new Error('Response body is empty');
                return new ApplicationMapper().toApp(response.body);
            }),
            catchError((error: HttpErrorResponse) => {
                this.apiErrorHandler.handle(error);
                if (error.status === 422) return throwError(() => error);
                return EMPTY;
            })
        );
    }

    /**
     * Updates an existing application.
     * Shows a success message via `ApiSuccessHandlerService`.
     * Updates the `_show` signal with the new application data.
     * Re-throws validation errors (422) for the Page/form to handle.
     * @param application The current application (used for ID).
     * @param updatedApplication The updated application data to send.
     * @returns Observable emitting the updated `Application` mapped from API response body.
     */
    updateApplication(application: Application, updatedApplication: Application): Observable<Application> {
        const url = `http://localhost:9025/api/applications/${application.id}`;
        const payload = new ApplicationMapper().toApi(updatedApplication);

        return this.http.put<ApplicationApiResource>(url, payload, { observe: 'response' as const }).pipe(
            tap((response: HttpResponse<ApplicationApiResource>) => {
                if (response.body) {
                    this.apiSuccessHandler.handle(response, `Application ${response.body.name} updated successfully.`);
                    this.setShow(new ApplicationMapper().toApp(response.body));
                }
            }),
            map((response: HttpResponse<ApplicationApiResource>) => {
                if (!response.body) throw new Error('Response body is empty');
                return new ApplicationMapper().toApp(response.body);
            }),
            catchError((error: HttpErrorResponse) => {
                this.apiErrorHandler.handle(error);
                if (error.status === 422) return throwError(() => error);
                return EMPTY;
            })
        );
    }

    /**
     * Deletes an application by ID.
     * Shows a success message via `ApiSuccessHandlerService`.
     * @param application The `Application` object to delete.
     * @returns Observable emitting `null` when deletion is successful.
     */
    deleteApplication(application: Application): Observable<null> {
        const url = `http://localhost:9025/api/applications/${application.id}`;
        return this.http.delete<null>(url, { observe: 'response' as const }).pipe(
            tap((response) => {
                this.apiSuccessHandler.handle(response, `Application ${application.name} deleted successfully.`);
            }),
            map(() => null),
            catchError((error: HttpErrorResponse) => {
                this.apiErrorHandler.handle(error);
                return EMPTY;
            })
        );
    }
}
