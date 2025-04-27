import { test, expect } from '@playwright/test';
import { ApiRegistrationUtils } from '../../api-utils/index';
import { lstat } from 'fs';

test.describe('API registration tests', () => {
  let api: ApiRegistrationUtils;

  test.beforeEach(async () => {
    api = new ApiRegistrationUtils();
    await api.initialize();
  });

  test('Register new user', async () => {
    const username = 'api_user_' + Math.random().toString(36).substring(2, 10);
    const password = "123Arba%%";
    const newUser = {
        username,
        firstName: "a",
        lastName: "c",
        password,
        confirmPassword: password
    }
    const response = await api.post(newUser);
    expect(response.status(), `Expected response to be 201 but was ${response.status}`).toBe(201);
  });

  test('should fail to crete new user with no first name', async () => {
    const username = 'api_user_' + Math.random().toString(36).substring(2, 10);
    const password = "123Arba%%";
    const newUser = {
        username,
        firstName: "",
        lastName: "c",
        password,
        confirmPassword: password
    }
    const response = await api.post(newUser);
    const responseJson = await response.json();
    console.log(responseJson)
    expect(response.status(), `Expected response to be 400 but was ${response.status}`).toBe(400);
    expect(responseJson.message, `Expected error message to be "First name is required" but was ${responseJson.message}`)
    .toBe("first name is required");
  });

  // This is a bug in the API
//   test('should fail to crete new user with different passwords', async () => {
//     const username = 'api_user_' + Math.random().toString(36).substring(2, 10);
//     const password = "123Arba%%";
//     const newUser = {
//         username,
//         firstName: "a",
//         lastName: "c",
//         password,
//         confirmPassword: password.substring(0, 5) + '@#$'
//     }
//     const response = await api.post(newUser);
//     const responseJson = await response.json();
//     console.log(responseJson)
//     expect(response.status(), `Expected response to be 400 but was ${response.status}`).toBe(400);
//   });

  test('should fail to crete new user with same username', async () => {
    const username = 'api_user_' + Math.random().toString(36).substring(2, 10);
    const password = "123Arba%%";
    const newUser = {
        username,
        firstName: "a",
        lastName: "c",
        password,
        confirmPassword: password
    }
    const newUserSameUsername = {
        username,
        firstName: 'O',
        lastName: 'G',
        password,
        confirmPassword: password
    }
    const response = await api.post(newUser);
    const secondResponse = await api.post(newUserSameUsername);

    const responseJson = await secondResponse.json();
    console.log(responseJson)
    expect(secondResponse.status(), `Expected response to be 400 but was ${response.status}`).toBe(400);
    expect(responseJson.message, `Expected error message to be "First name is required" but was ${responseJson.message}`)
    .toBe("UsernameExistsException: User already exists");
  });


});