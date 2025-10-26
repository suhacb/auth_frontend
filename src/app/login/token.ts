import {TokenInterface } from './token.d';

export class Token implements TokenInterface {
    public readonly accessToken: string | null;
    public readonly tokenType: string | null;
    public readonly expiresIn: number | null;
    public readonly refreshToken: string | null;
    public readonly refreshExpiresIn: number | null;
    public readonly scope: string | null;
    public readonly idToken: string | null;
    public readonly notBeforePolicy: string | null;
    public readonly sessionState: string | null;

    constructor (data: any) {
        this.accessToken = data?.access_token ?? null;
        this.tokenType = data?.token_type ?? null;
        this.expiresIn = data?.expires_in ?? null;
        this.refreshToken = data?.refresh_token ?? null;
        this.refreshExpiresIn = data?.refresh_expires_in ?? null;
        this.scope = data?.scope ?? null;
        this.idToken = data?.id_token ?? null;
        this.notBeforePolicy = data?.not_before_policy ?? null;
        this.sessionState = data?.session_state ?? null;
    }
}