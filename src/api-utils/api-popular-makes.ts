import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class ApiPopularMakesUtils {
  private requestContext: APIRequestContext;
  readonly baseURL: string;

  constructor() {
    this.baseURL = `https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com`;
  }

  async initialize(endpoint: string): Promise<void> {
    this.requestContext = await request.newContext({
      baseURL: this.baseURL+endpoint
    });
  }

  async getModelsResponse(page: number = 1) {
    const response = await this.requestContext.get('?modelsPage=' + page);
    return response.json();
  }

  async getPopularMake() {
    this.requestContext = await request.newContext({
      baseURL: 'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod',
    });
    const response = await this.requestContext.get('/dashboard');
    const responseBody = await response.json();
    console.log('Full Response Body:', responseBody);
    return responseBody['make']['id'];
}

}