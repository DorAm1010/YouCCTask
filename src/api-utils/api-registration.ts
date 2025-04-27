import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class ApiRegistrationUtils {
  private requestContext: APIRequestContext;
  readonly baseURL: string;

  constructor() {
    this.baseURL = 'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users';
  }

  async initialize(headers: Record<string, string> = {}) {
    this.requestContext = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: headers,
    });
  }

  async post(body: Record<string, any>) {
    const response = await this.requestContext.post('',{ data: body });
    return response;
  }

}