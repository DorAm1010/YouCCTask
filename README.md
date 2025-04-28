# YouCC Playwright task
This project contains automated tests for the Buggy Cars website, covering both UI and API functionalities. The tests are written using the [Playwright](https://playwright.dev/) framework and are organized into Page Object Model (POM) and utility classes for better maintainability.

## Project Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/DorAm1010/YouCCTask.git
    ```
2. Navigate to the project directory:
    ```bash
    cd YouCC
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Install Playwright browsers:
    ```bsah
    npx playwright install
    ```

## Run project options

1. Run all tests:
    ```bash
    npm test
    ```
2. Run tests in debug mode:
    ```bash
    npm run test:debug
    ```

3. Run tests in headed & debug mode:
    ```bash
    npm run test:headed:debug
    ```

4. Run a specific test file:
    ```bash
    npm run test:file -- path/to/test/file.spec.ts
    ```

5. Run a specific test file in headed mode with trace:
    ```bash
    npm run test:file:headed:trace
    ```

6. Run tests with retry:
    ```bash
    npm run test:retry
    ```

7. Run tests in headed mode with retry:
    ```bash
    npm run test:headed:retry
    ```

8. Run specific test:
    ```bash
    npm run test:name
    ```

8. Run specific test in headed mode:
    ```bash
    npm run test:name:headed
    ```
