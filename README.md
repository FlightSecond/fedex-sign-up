# Fedex Sign-Up

## The solution info

### Technical choices

- The validation is done in three levels:
  - Native HTML5 validation covers the required fields / email / password regexp validation and is showing the native interface (using the system language of the user). It also scrolls to the first invalid field out-of-box which is very useful on the mobile devices.
  - Angular built-in validators if the HTML5 validators fail.
  - Angular custom validator to check the password for the user's first or last name.
    - The custom validator uses simple `includes()` function instead of more complicated negative lookahead assertion (regexp), which can be used without writing a custom validator. It's easier to support and understand a custom validator in my opinion.
- ESLint and Prettier are connected to automatically and manually format the code. [TSLint is deprecated](https://github.com/palantir/tslint/issues/4904) in 2019, so I decided not to use it here.
- [Yarn](https://yarnpkg.com) is used as a package manager as it works faster then npm and can use the package.json in the same way.
- I was choosing between Angular Material and Bootstrap as a framework, but decided to use the native controls. So I just used Bootstrap sass not to write the css code (0 lines written). _Future step: Only the needed parts of Bootstrap sass can be imported instead of the full library (23 KB not gzipped)._
- Cypress was used to cover the code with end to end tests, as it's built using JavaScript and was easy to install and run.
- Jasmine test framework (Karma test runner) was used to write the unit-tests as it perfectly supports Angular. **The unit-test coverage is 100%.**

### Some task questions

- I decided not to send a password to the BE as it wasn't described in the task. In the real world, I will ask the BE engineer / PO if we should use the password in some other way or the task description is not correct.

- The sample post API request data format in the task description doesn't have quotes around the keys and also have line breaks and two spaces in the front. I decided to manually format the request. It can be also done using external or self-written library, but I decided that it will be an overkill in this case.

### Current limitations

- Password shoud contain at least one lower and one uppercase **latin** letter. I didn't find the way to correctly check all the other alphabets (cyrillic / greek / etc) using JavaScript regular expressions.
- Automatically generated password by the browser can contain user's first or last name and the form can be invalid (in theory)
- Frontend validation can be easily skipped by the ill-wisher, so the backend validation is still needed.

### Possible next steps

- Captcha or invisible captcha needed to prevent spaming the server (BE part needed)
- If the server can be potentially overloaded, retryWhen with geometric / exponential delay should be implemented using http interceptors or directly in the service.
- Pre-commit hooks can be installed to run the test coverage and linting automatically.
- Automatic testing and deployment setup can be done using GitHub Actions / Circle CI / etc. _Currenty, the project can only be manually deployed to the GitHub pages using `ng deploy` command (cridentials needed)._
- Automatic JavaScript error tracking can be done (using Sentry.io etc).
- Istanbul Code Coverage can be connected to show the coverage by Cypress e2e tests. _Currently, you can only see the coverage by the unit-tests using `ng test` command and navigating to the coverage folder._
- Only needed parts of Bootstrap sass can be imported instead of the full library.

## Initial setup and run

This project uses [yarn](https://yarnpkg.com) as a package manager.

Please run `npm install -g yarn` to install it
and then run `yarn` to install the dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Angular CLI basic commands

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io) and see the coverage.

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Deploy to GitHub pages

Run `ng deploy` to deploy the production build to GitHub Pages (cridentials needed).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
