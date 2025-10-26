export interface ApplicationResponseContract {
    callback_url: string | null,
    client_id: string,
    created_at: Date,
    deleted_at: Date,
    description: string | null,
    grant_type: string,
    id: number,
    name: string,
    realm: string,
    updated_at: Date,
    url: string | null
}