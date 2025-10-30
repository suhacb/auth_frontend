export interface ApplicationResource {
    public callbackUrl: string | null,
    public clientId: string | null,
    public createdAt: Date | null,
    public deletedAt: Date | null,
    public description: string | null,
    public grantType: string | null,
    public id: number | null,
    public name: string | null,
    public realm: string | null,
    public updatedAt: Date | null,
    public url: string | null,
    public clientSecret?: string | null;
}