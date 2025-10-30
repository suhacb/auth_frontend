import { ApplicationContract } from "../contracts/application";
import { ApplicationResponseContract } from "../contracts/application_response";

export class Application implements ApplicationContract {
    public callbackUrl!: string | null;
    public clientId!: string | null;
    public createdAt!: Date | null;
    public deletedAt!: Date | null;
    public description!: string | null;
    public grantType!: string | null;
    public id!: number | null;
    public name!: string | null;
    public realm!: string | null;
    public updatedAt!: Date | null;
    public url!: string | null;

    constructor(raw: ApplicationResponseContract | ApplicationContract | null = null) {
        if (!raw) {
        this.mapFromNull();
        return;
        }

        if (this.isApplicationResponse(raw)) {
            this.mapFromResponse(raw);
        } else {
            this.mapFromApplication(raw);
        }
    }

    private isApplicationResponse(raw: ApplicationResponseContract | ApplicationContract): raw is ApplicationResponseContract {
        return 'client_id' in raw;
    }

    private mapFromNull(): void {
        this.callbackUrl = null;
        this.clientId = null;
        this.createdAt = null;
        this.deletedAt = null;
        this.description = null;
        this.grantType = null;
        this.id = null;
        this.name = null;
        this.realm = null;
        this.updatedAt = null;
        this.url = null;
    }

    private mapFromResponse(raw: ApplicationResponseContract): void {
        this.callbackUrl = raw.callback_url;
        this.clientId = raw.client_id;
        this.createdAt = new Date(raw.created_at);
        this.deletedAt = new Date(raw.deleted_at);
        this.description = raw.description;
        this.grantType = raw.grant_type;
        this.id = Number(raw.id);
        this.name = raw.name;
        this.realm = raw.realm;
        this.updatedAt = new Date(raw.updated_at);
        this.url = raw.url;
    }

    private mapFromApplication(raw: ApplicationContract): void {
        this.callbackUrl = raw.callbackUrl;
        this.clientId = raw.clientId;
        this.createdAt = raw.createdAt;
        this.deletedAt = raw.deletedAt;
        this.description = raw.description;
        this.grantType = raw.grantType;
        this.id = Number(raw.id);
        this.name = raw.name;
        this.realm = raw.realm;
        this.updatedAt = raw.updatedAt;
        this.url = raw.url;
    }
}