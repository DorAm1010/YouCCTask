import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class ApiProfileUtils {
  private requestContext: APIRequestContext;
  readonly baseURL: string;
  readonly token: string;

  constructor(token: string) {
    this.baseURL = 'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users/profile';
    this.token = token;
  }

  async initialize(baseURL: string, headers: Record<string, string> = {}) {
    headers['Authorization'] = `Bearer ${this.token}`
    this.requestContext = await request.newContext({
      baseURL,
      extraHTTPHeaders: headers,
    });
  }

  async get(endpoint: string, params?: Record<string, string>) {
    const response = await this.requestContext.get(endpoint, { params });
    return await response.json();
  }

  async post(endpoint: string, body: Record<string, any>) {
    const response = await this.requestContext.post(endpoint, { data: body });
    return await response.json();
  }
}