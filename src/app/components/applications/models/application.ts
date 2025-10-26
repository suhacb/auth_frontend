import { ApplicationContract } from "../contracts/application";
import { ApplicationResponseContract } from "../contracts/application_response";

export class Application implements ApplicationContract {
    public callbackUrl: string | null;
    public clientId: string;
    public createdAt: Date;
    public deletedAt: Date;
    public description: string | null;
    public grantType: string;
    public id: number;
    public name: string;
    public realm: string;
    public updatedAt: Date;
    public url: string | null;

    constructor(raw: ApplicationResponseContract) {
        this.callbackUrl = raw.callback_url;
        this.clientId = raw.client_id;
        this.createdAt = new Date(raw.created_at);
        this.deletedAt = new Date(raw.deleted_at);
        this.description = raw.description;
        this.grantType = raw.grant_type;
        this.id = raw.id;
        this.name = raw.name;
        this.realm = raw.realm;
        this.updatedAt = new Date(raw.updated_at);
        this.url = raw.url;
    }
}