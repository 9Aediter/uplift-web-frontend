/**
 * Facebook OAuth API Types
 * @see https://developers.facebook.com/docs/graph-api
 */

export interface FacebookUserProfile {
  id: string;
  name: string;
  email: string;
  picture?: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
  first_name?: string;
  last_name?: string;
}

export interface FacebookOAuthConfig {
  appId: string;
  appSecret: string;
  redirectUri: string;
}

export interface FacebookTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
