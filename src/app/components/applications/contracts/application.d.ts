import { ApplicationResponseContract } from "./application_response";

export interface ApplicationContract {
    public callbackUrl?: string | null;
    public callback_url?: string | null;

    public clientId?: string | null;
    public client_id?: string | null;
    
    public createdAt?: Date | null;
    public created_at?: string | null;
    
    public deletedAt?: Date | null;
    public deleted_at?: string | null;
    
    public description?: string | null;
    
    public grantType?: string | null;
    public grant_type?: string | null;
    
    public id?: string | number | null;
    
    public name?: string | null;
    
    public realm?: string | null;
    
    public updatedAt?: Date | null;
    public updated_at?: string | null;
    
    public url?: string | null;
}