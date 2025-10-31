import { ResourceMapper } from "../../../core/ResourceMapper/ResourceMapper";
import { Application, ApplicationApiPayload, ApplicationApiResource } from "../contracts/Application";

export class ApplicationMapper extends ResourceMapper<Application, ApplicationApiResource, ApplicationApiPayload> {
    public toApp(api: ApplicationApiResource): Application {
        return {
            callbackUrl: api.callback_url,
            clientId: api.client_id,
            createdAt: new Date(api.created_at),
            deletedAt: api.deleted_at ? new Date(api.deleted_at) : null,
            description: api.description,
            grantType: api.grant_type,
            id: Number(api.id),
            name: api.name,
            realm: api.realm,
            updatedAt: new Date(api.updated_at),
            url: api.url,
            clientSecret: api.client_secret ?? undefined
        }
    }

    public toApi(app: Application): ApplicationApiPayload {
        return {
            callback_url: app.callbackUrl,
            client_id: app.clientId,
            description: app.description,
            grant_type: app.grantType,
            name: app.name,
            realm: app.realm,
            url: app.url,
            client_secret: app.clientSecret ?? undefined
        }
    }

    public make(): Application {
        return {
            callbackUrl: '',
            clientId: '',
            createdAt: new Date(),
            deletedAt: null,
            description: '',
            grantType: '',
            id: Number(),
            name: '',
            realm: '',
            updatedAt: new Date(),
            url: '',
            clientSecret: ''
        }
    }
}