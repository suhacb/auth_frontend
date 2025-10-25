import { Injectable, signal, computed, inject } from '@angular/core';
import { Token } from '../login/token';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ApiErrorHandlerService, ApiErrorResult } from '../core/http/api-error-handler.service';

@Injectable({ providedIn: 'root' })

export class AuthStore {
    constructor(private http: HttpClient, private apiErrorHandler: ApiErrorHandlerService) {}

    private _accessToken = signal<string | null>(null);
    private _tokenType = signal<string | null>(null);
    private _expiresIn = signal<number | null>(null);
    private _refreshToken = signal<string | null>(null);
    private _refreshExpiresIn = signal<number | null>(null);
    private _scope = signal<string | null>(null);
    private _idToken = signal<string | null>(null);
    private _notBeforePolicy = signal<string | null>(null);
    private _sessionState = signal<string | null>(null);

    // expose readonly signals
    readonly accessToken = this._accessToken.asReadonly();
    readonly tokenType = this._tokenType.asReadonly();
    readonly expiresIn = this._expiresIn.asReadonly();
    readonly refreshToken = this._refreshToken.asReadonly();
    readonly refreshExpiresIn = this._refreshExpiresIn.asReadonly();
    readonly scope = this._scope.asReadonly();
    readonly idToken = this._idToken.asReadonly();
    readonly notBeforePolicy = this._notBeforePolicy.asReadonly();
    readonly sessionState = this._sessionState.asReadonly();

    // derived/computed signals
    readonly isLoggedIn = computed(() => !!this._accessToken());

    // setters
    setToken(token: Token | null = null) {
        this.setAccessToken(token ? token.accessToken : null);
        this.setTokenType(token ? token.tokenType : null);
        this.setExpiresIn(token ? token.expiresIn : null);
        this.setRefreshToken(token ? token.refreshToken : null);
        this.setRefreshExpiresIn(token ? token.refreshExpiresIn : null);
        this.setScope(token ? token.scope : null);
        this.setIdToken(token ? token.idToken : null);
        this.setNotBeforePolicy(token ? token.notBeforePolicy : null);
        this.setSessionState(token ? token.sessionState : null);
    }

    setAccessToken(token: string | null = null) {
    this._accessToken.set(token);
    }

    setTokenType(tokenType: string | null) {
    this._tokenType.set(tokenType)
    }

    setExpiresIn(expiresIn: number | null) {
    this._expiresIn.set(expiresIn)
    }

    setRefreshToken(refreshToken: string | null) {
    this._refreshToken.set(refreshToken);
    }

    setRefreshExpiresIn(refreshExpiresIn: number | null) {
    this._refreshExpiresIn.set(refreshExpiresIn);
    }

    setScope(scope: string | null) {
    this._scope.set(scope);
    }

    setIdToken(idToken: string | null) {
    this._idToken.set(idToken);
    }

    setNotBeforePolicy(notBeforePolicy: string | null) {
    this._notBeforePolicy.set(notBeforePolicy);
    }

    setSessionState(sessionState: string | null) {
    this._sessionState.set(sessionState);
    }

    reset() {
        this.setToken();
    }

    async login(username: string, password: string): Promise<true | ApiErrorResult | false> {
        const url = 'http://localhost:9025/api/auth/login';
        const body = {username, password};

        try {
            const response = await firstValueFrom(
                this.http.post(url, body, { observe: 'response' })
            );

            this.setToken(new Token(response.body));
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
