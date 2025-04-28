import { test, expect } from '@playwright/test';
import { ApiProfileUtils } from '../../api-utils/index';

test.describe('API Tests', () => {
  let api: ApiProfileUtils;

  test.beforeAll(() => {
    // TODO: Initialize the API context with a valid token
    api = new ApiProfileUtils('');
  });

});