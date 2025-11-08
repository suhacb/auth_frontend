export interface ApplicationApiResource {
    callback_url: string,
    client_id: string,
    created_at: string,
    deleted_at: string | null,
    description: string,
    grant_type: string,
    id: string,
    name: string,
    realm: string,
    updated_at: string,
    url: string,
    client_secret?: string;
}

export interface Application {
    callbackUrl: string,
    clientId: string,
    createdAt: Date,
    deletedAt: Date | null,
    description: string,
    grantType: string,
    id: number,
    name: string,
    realm: string,
    updatedAt: Date,
    url: string,
    clientSecret?: string;
}

/**
 * What we send *to* the backend (for update operations).
 * Note:
 * - We don’t include `id`, `created_at`, `updated_at` because they’re backend-managed.
 * - We *may* include `grant_type`.
 */
export interface ApplicationApiPayload {
    callback_url: string,
    client_id: string,
    description: string,
    grant_type: string,
    name: string,
    realm: string,
    url: string,
    client_secret?: string;
}

/**
 * What we create in the application (for create operations).
 * Note:
 * - We don’t include `id`, `created_at`, `updated_at` because they’re backend-managed.
 * - We *may* include `grant_type`.
 */
export interface UserAppPayload {
    callbackUrl: string,
    clientId: string,
    description: string,
    grantType: string,
    name: string,
    realm: string,
    url: string,
    clientSecret: string;
}