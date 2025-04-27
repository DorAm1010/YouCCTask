// import { test, expect } from '@playwright/test';
// import { ApiRProfileUtils } from '../../api-utils/index';

// test.describe('API Tests', () => {
//   let api: ApiRProfileUtils;

//   test.beforeAll(() => {
//     // TODO: Initialize the API context with a valid token
//     api = new ApiRProfileUtils('');
//   });

//   test('should fetch user profile', async () => {
//     const response = await api.get('/users/profile');
//     expect(response).toHaveProperty('id');
//     expect(response).toHaveProperty('name');
//   });

//   test('should create a new user', async () => {
//     const newUser = {
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//     };
//     const response = await api.post('/users', newUser);
//     expect(response).toHaveProperty('id');
//     expect(response.name).toBe(newUser.name);
//   });
// });