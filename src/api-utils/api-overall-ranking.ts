import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class ApiOverallRankingUtils {
  private requestContext: APIRequestContext;
  readonly baseURL: string;

  constructor(make: string = 'ckl2phsabijs71623vk0') {
    this.baseURL = `https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/makes/${make}`;
  }

  async initialize(baseURL: string, headers: Record<string, string> = {}) {
    this.requestContext = await request.newContext({
      baseURL,
      extraHTTPHeaders: headers,
    });
  }

  async get(endpoint: string, params?: Record<string, string>) {
    const response = await this.requestContext.get(endpoint, { params });
    return this.handleResponse(response);
  }

  private async handleResponse(response: APIResponse) {
    if (!response.ok()) {
      throw new Error(`API call failed with status ${response.status()}: ${await response.text()}`);
    }
    return response.json();
  }

}