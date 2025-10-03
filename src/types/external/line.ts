/**
 * LINE LIFF API Types
 * @see https://developers.line.biz/en/docs/liff/
 */

export interface LineProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export interface LineLiffConfig {
  liffId: string;
}

export interface LineLiffAuthData {
  profile: LineProfile;
  accessToken: string;
}

export interface LineTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token?: string;
  scope: string;
  token_type: string;
}
