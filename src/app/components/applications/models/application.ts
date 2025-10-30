import { ApplicationResource } from "../contracts/ApplicationResource";
import { ApplicationApiResource } from "../contracts/ApplicationApiResource";
import { ApplicationContract } from "../contracts/ApplicationContract";

interface ApplicationConstructorOptions {
    apiData?: ApplicationApiResource;
    rawData?: ApplicationResource;
}

export class Application implements ApplicationContract {
    private _apiData: ApplicationApiResource;
    private _rawData: ApplicationResource;
    
    constructor(options: ApplicationConstructorOptions = {}) {
        const { apiData, rawData } = options;
        if (apiData) {
            this._apiData = apiData;
            this._rawData = this.transformApiToRaw(apiData);
        } else if (rawData) {
            this._rawData = rawData;
            this._apiData = this.transformRawToApi(rawData);
        } else {
            this._apiData = this.createApiFromNull();
            this._rawData = this.transformApiToRaw(this._apiData);
        }
    }

    private transformApiToRaw(api: ApplicationApiResource): ApplicationResource {
        return {
            callbackUrl: api.callback_url ?? null,
            clientId: api.client_id ?? null,
            createdAt: api.created_at ? new Date(api.created_at) : null,
            deletedAt: api.deleted_at ? new Date(api.deleted_at) : null,
            description: api.description ?? null,
            grantType: api.grant_type ?? null,
            id: api.id ? Number(api.id) : null,
            name: api.name ?? null,
            realm: api.realm ?? null,
            updatedAt: api.updated_at ? new Date(api.updated_at) : null,
            url: api.url ?? null,
            clientSecret: api.client_secret ?? undefined
        };
    }

    private transformRawToApi(raw: ApplicationResource): ApplicationApiResource {
        return {
            callback_url: raw.callbackUrl ?? null,
            client_id: raw.clientId ?? null,
            created_at: raw.createdAt?.toDateString() ?? null,
            deleted_at: raw.deletedAt?.toDateString() ?? null,
            description: raw.description ?? null,
            grant_type: raw.grantType ?? null,
            id: raw.id ? String(raw.id) : null,
            name: raw.name ?? null,
            realm: raw.realm ?? null,
            updated_at: raw.updatedAt?.toDateString() ?? null,
            url: raw.url ?? null,
            client_secret: raw.clientSecret ?? undefined
        };
    }

    private createApiFromNull(): ApplicationApiResource {
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
            url: null,
            client_secret: undefined,
        };
    }

    public toApi(): ApplicationApiResource {
        return this._apiData;
    }

    public toRaw(): ApplicationResource {
        return this._rawData;
    }

    get callbackUrl(): string | null
    {
        return this._rawData.callbackUrl ?? null;
    }

    get callback_url(): string | null {
        return this._apiData.callback_url ?? null;
    }
    
    get clientId(): string | null {
        return this._rawData.clientId ?? null;
    }
    
    get client_id(): string | null {
        return this._apiData.client_id ?? null;
    }
    
    get createdAt(): Date | null {
        return this._rawData.createdAt ?? null;
    }
    
    get created_at(): string | null {
        return this._apiData.created_at ?? null;
    }
    
    get deletedAt(): Date | null {
        return this._rawData.deletedAt ?? null;
    }
    
    get deleted_at(): string | null {
        return this._apiData.deleted_at ?? null;
    }
    
    get description(): string | null {
        return this._rawData.description ?? null;
    }
    
    get grantType(): string | null {
        return this._rawData.grantType ?? null;
    }
    
    get grant_type(): string | null {
        return this._apiData.grant_type ?? null;
    }
    
    get id(): number | string | null {
        return this._rawData.id ?? null;
    }
    
    get name(): string | null {
        return this._rawData.name ?? null;
    }
    
    get realm(): string | null {
        return this._rawData.realm ?? null;
    }
    
    get updatedAt(): Date | null {
        return this._rawData.updatedAt ?? null;
    }
    
    get updated_at(): string | null {
        return this._apiData.updated_at ?? null;
    }
    
    get url(): string | null {
        return this._rawData.url ?? null;
    }

    get client_secret(): string | null | undefined {
        return this._apiData.client_secret;
    }

    get clientSecret(): string | null | undefined {
        return this._rawData.clientSecret;
    }

    set callback_url(value: string | null) {
        this._apiData.callback_url = value;
        this._rawData.callbackUrl = value;
    }

    set callbackUrl(value: string | null) {
        this._rawData.callbackUrl = value;
        this._apiData.callback_url = value;
    }

    set client_id(value: string | null) {
        this._apiData.client_id = value;
        this._rawData.clientId = value;
    }

    set clientId(value: string | null) {
        this._rawData.clientId = value;
        this._apiData.client_id = value;
    }

    set created_at(value: string | null) {
        this._apiData.created_at = value;
        this._rawData.createdAt = value ? new Date(value) : null;
    }

    set createdAt(value: Date | null) {
        this._rawData.createdAt = value;
        this._apiData.created_at = value ? value.toString() : null;
    }

    set deleted_at(value: string | null) {
        this._apiData.deleted_at = value;
        this._rawData.deletedAt = value ? new Date(value) : null;
    }

    set deletedAt(value: Date | null) {
        this._rawData.deletedAt = value;
        this._apiData.deleted_at = value ? value.toString() : null;
    }

    set description(value: string | null) {
        this._apiData.description = value;
        this._rawData.description = value;
    }

    set grant_type(value: string | null) {
        this._apiData.grant_type = value;
        this._rawData.grantType = value;
    }

    set grantType(value: string | null) {
        this._rawData.grantType = value;
        this._apiData.grant_type = value;
    }

    set id(value: string | number | null) {
        this._apiData.id = value ? String(value) : null;
        this._rawData.id = value ? Number(value) : null;
    }

    set name(value: string | null) {
        this._apiData.name = value;
        this._rawData.name = value;
    }

    set realm(value: string | null) {
        this._apiData.realm = value;
        this._rawData.realm = value;
    }

    set updated_at(value: string | null) {
        this._apiData.updated_at = value;
        this._rawData.updatedAt = value ? new Date(value) : null;
    }

    set updatedAt(value: Date | null) {
        this._rawData.updatedAt = value;
        this._apiData.updated_at = value ? value.toString() : null;
    }

    set url(value: string | null) {
        this._apiData.url = value;
        this._rawData.url = value;
    }
}