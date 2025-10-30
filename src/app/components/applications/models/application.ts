import { ApplicationContract } from "../contracts/application";
import { ApplicationResponseContract } from "../contracts/application_response";

export class Application implements ApplicationContract{
    private _raw;
    
    constructor(raw: ApplicationResponseContract | null = null) {
        if (raw) {
            this._raw = raw;
            return;
        }
        this._raw = this.createRawFromNull();
    }

    private createRawFromNull(): ApplicationResponseContract {
        return {
            callback_url: null,
            client_id: null,
            created_at: null,
            deleted_at: null,
            description: null,
            grant_type: null,
            id: null,
            name: null,
            realm: null,
            updated_at: null,
            url: null
        };
    }

    get callbackUrl(): string | null
    {
        return this._raw.callback_url ?? null;
    }

    get callback_url(): string | null {
        return this._raw.callback_url ?? null;
    }
    
    get clientId(): string | null {
        return this._raw.client_id ?? null;
    }
    
    get client_id(): string | null {
        return this._raw.client_id ?? null;
    }
    
    get createdAt(): Date | null {
        return this._raw.created_at ? new Date(this._raw.created_at) : null;
    }
    
    get created_at(): string | null {
        return this._raw.created_at ?? null;
    }
    
    get deletedAt(): Date | null {
        return this._raw.deleted_at ? new Date(this._raw.deleted_at) : null;
    }
    
    get deleted_at(): string | null {
        return this._raw.deleted_at ?? null;
    }
    
    get description(): string | null {
        return this._raw.description ?? null;
    }
    
    get grantType(): string | null {
        return this._raw.grant_type ?? null;
    }
    
    get grant_type(): string | null {
        return this._raw.grant_type ?? null;
    }
    
    get id(): number | string | null {
        return this._raw.id ? Number(this._raw.id) : null;
    }
    
    get name(): string | null {
        return this._raw.name ?? null;
    }
    
    get realm(): string | null {
        return this._raw.realm ?? null;
    }
    
    get updatedAt(): Date | null {
        return this._raw.updated_at ? new Date(this._raw.updated_at) : null;
    }
    
    get updated_at(): string | null {
        return this._raw.updated_at ?? null;
    }
    
    get url(): string | null {
        return this._raw.url ?? null;
    }

    set callback_url(value: string | null) {
        this._raw.callback_url = value;
    }

    set client_id(value: string | null) {
        this._raw.client_id = value;
    }

    set created_at(value: string | null) {
        this._raw.created_at = value;
    }

    set deleted_at(value: string | null) {
        this._raw.deleted_at = value;
    }

    set description(value: string | null) {
        this._raw.description = value;
    }

    set grant_type(value: string | null) {
        this._raw.grant_type = value;
    }

    set id(value: string | number | null) {
        this._raw.id = value ? String(value) : null;
    }

    set name(value: string | null) {
        this._raw.name = value;
    }

    set realm(value: string | null) {
        this._raw.realm = value;
    }

    set updated_at(value: string | null) {
        this._raw.updated_at = value;
    }

    set url(value: string | null) {
        this._raw.url = value;
    }
}