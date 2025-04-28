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

  async getToken(postPayload: Record<string, any>) {
    const tokenResponse = await this.requestContext.post('/prod/oauth/token',{ data: postPayload });
    console.log("Token response is: ", tokenResponse);
    const token = await tokenResponse.json()['access_token'];
    return token;
  }

  async login(token: string, getPayload: Record<string, any>) {
    this.requestContext = await request.newContext({
      baseURL: this.baseURL+'/prod/users/current',
      extraHTTPHeaders: {
        Authorization: `Bearer eyJraWQiOiJwNDBtYVJYRVg0VmFFQnpTbzUrSDRUd2UxcTF4cUpMcGEwQ3lPaVNmUTZBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1ZDkyM2FjMS1hMTY4LTRiOGMtOGRlNi1jODc4OWExMTE1ZDUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfRVRUSUtjU3NvIiwiY2xpZW50X2lkIjoiMnQxbXV0Z2M0YXVpdWhvcWltajJjdDBoOG4iLCJvcmlnaW5fanRpIjoiYjg4ZGY5NTMtZjM2MC00YjI3LTkyOTUtYTY1NjNmNDI1NWFhIiwiZXZlbnRfaWQiOiIwZmRmYmMzYy0xZTUzLTQ2OWItYTE3Yy1lMzk2MjgxM2U3MzMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzQ1Nzg5OTQ1LCJleHAiOjE3NDU3OTM1NDUsImlhdCI6MTc0NTc4OTk0NSwianRpIjoiMjNhNjA3OGUtNGJlYi00OWFlLTlmZjMtNDYzYjE3MTg1MDU2IiwidXNlcm5hbWUiOiJEb3JBbXJhbmkifQ.Ze8XKOUapE1iekuPyaNjL-z8AIUIgbWjkDe5dZ66i3bnjT8FD7vvW_4cCpc3bbyc8mkcfQNju1GXbC2hBzQF0-PSLxREQqg2Q0OdxJMKxU7mwLJqyB7hHkKZP0dlR4d37X4chmST6gT6LYvJgE1HDFsm3yqY4_z-ZfvecAPrk7wU7JbIAnlN0OiC0Fw0lYwHn59xr0OZ9d0lEnlJxQJJNAs7O90oJwcRcde8b-Px8f2A0G4efVTYezkbABwf5OHKoMMWqN6EsQ_c6AAwx8WOIBubpjIbcGC12krmyd-Z5TR2h9k5cxJT_xEsRPml5lQqenoJILnWj62c9iaUEKT3rw
`
      }
    });

    const response = await this.requestContext.get('/prod/users/current', { data: getPayload});
    return response;
  }

}