import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class ApiRegistrationUtils {
  private requestContext: APIRequestContext;
  readonly baseURL: string;

  constructor() {
    this.baseURL = 'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users';
  }

  async initialize(baseURL: string, headers: Record<string, string> = {}) {
    this.requestContext = await request.newContext({
      baseURL,
      extraHTTPHeaders: headers,
    });
  }

  async post(endpoint: string, body: Record<string, any>) {
    const response = await this.requestContext.post(endpoint, { data: body });
    return this.handleResponse(response);
  }
 async handleResponse(response: APIResponse) {
    if (!response.ok()) {
      throw new Error(`API call failed with status ${response.status()}: ${await response.text()}`);
    }
    return response.json();
  }
}