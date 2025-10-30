export interface ApplicationContract {
    public readonly callbackUrl: string | null,
    public readonly callback_url: string | null,

    public readonly clientId: string | null,
    public readonly client_id: string | null,
    
    public readonly createdAt: Date | null,
    public readonly created_at: string | null,
    
    public readonly deletedAt: Date | null,
    public readonly deleted_at: string | null,
    
    public readonly description: string | null,
    
    public readonly grantType: string | null,
    public readonly grant_type: string | null,
    
    public readonly id: string | number | null,
    
    public readonly name: string | null,
    
    public readonly realm: string | null,
    
    public readonly updatedAt: Date | null,
    public readonly updated_at: string | null,
    
    public readonly url: string | null
}