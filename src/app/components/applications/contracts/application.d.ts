export interface ApplicationContract {
    public callbackUrl: string | null,
    public clientId: string,
    public createdAt: Date,
    public deletedAt: Date,
    public description: string | null,
    public grantType: string,
    public id: number,
    public name: string,
    public realm: string,
    public updatedAt: Date,
    public url: string | null
}