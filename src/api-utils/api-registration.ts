import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class ApiRegistrationUtils {
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
    return this.handleResponse(response);
  }

  async post(endpoint: string, body: Record<string, any>) {
    const response = await this.requestContext.post(endpoint, { data: body });
    return this.handleResponse(response);
  }

  async put(endpoint: string, body: Record<string, any>) {
    const response = await this.requestContext.put(endpoint, { data: body });
    return this.handleResponse(response);
  }

  async delete(endpoint: string) {
    const response = await this.requestContext.delete(endpoint);
    return this.handleResponse(response);
  }

  private async handleResponse(response: APIResponse) {
    if (!response.ok()) {
      throw new Error(`API call failed with status ${response.status()}: ${await response.text()}`);
    }
    return response.json();
  }
}