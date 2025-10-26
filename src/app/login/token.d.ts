export interface TokenInterface {
  accessToken: string | null;
  tokenType: string | null;
  expiresIn: number | null;
  refreshToken: string | null;
  refreshExpiresIn: number | null;
  scope: string | null;
  idToken: string | null;
  notBeforePolicy: string | null;
  sessionState: string | null;
}