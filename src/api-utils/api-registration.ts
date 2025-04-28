import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { console } from 'inspector';

export class ApiRegistrationUtils {
  private requestContext: APIRequestContext;
  readonly baseURL: string;

  constructor() {
    this.baseURL = 'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com';
  }

  async initialize(headers: Record<string, string> = {}) {
    this.requestContext = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: headers,
    });
  }

  async register(body: Record<string, any>) {
    const response = await this.requestContext.post('/prod/users',{ data: body });
    return response;
  }

  async getToken(formBody: Record<string, any>) {

    const tokenResponse = await this.requestContext.post('/prod/oauth/token', {
      form: formBody
    });
    
    const json = await tokenResponse.json();
    console.log("Token response is: ", json);
    return json['access_token'];
  }

  async login(token: string) {
    this.requestContext = await request.newContext({
      baseURL: this.baseURL+'/prod/users/current',
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    const response = await this.requestContext.get('/prod/users/current');
    return response;
  }

}