# [Treasure Map App](https://github.com/alanlachkar/treasureMap-carbonIT/)

The goal of this project is to show my technical skills with a pratice exercice.
The exercice was given to me by Carbon-IT.

Main goals:

- Read file which contain details (map size, location and number of treasure, character and location of mountains);
- Manage the characters' movement;
- Provides a record of the number of treasures each character has;

## Introduction and project configuration

Query React Template is designed for minimum configuration and **you can use all you need**:

- React API 18 with Hooks [React hooks](https://fr.reactjs.org/docs/hooks-intro.html).
- Typescript [TS](https://www.typescriptlang.org/).
- Standard CSS (CSS-loader, style-loader) this project allow you to choose your standard (inline, styled-components typestyle,css modules, preprocessors SASS/LESS)
- Yarn package manager [yarn](https://yarnpkg.com/).
- Webpack bundler [webpack](https://webpack.js.org/).
- Babel JS compiler ECMAScript 2015+ [babel](https://babeljs.io/docs/en/) (arrow function, and so on).
- Google TS stylesheet [google TS stylesheet](https://google.github.io/styleguide/tsguide.html).
- Prettier [prettier](https://prettier.io/) configuration with VScode
- ESlint [ESlint](https://eslint.org/) linter fix auto config VScode
- Jest [Jest](https://jestjs.io/fr/) unit test
- Cypress [Cypress](https://www.cypress.io/) end to end testing (features workflow)
- Mochawesome report cypress HTML and NYC coverage report

## Extra configuration

- Prettier

A `<GIT_DIRECTORY>/.prettierrc.json` exist to make the code more clean

- ESlint

This plugin is used to help you to develop and add rules to stylesheet your coding style.

- Git hooks

I run the .bat script in `<GIT_DIRECTORY>/.git-hooks` to instanciate the git hooks configuration on the project.

The commit-msg git hook is to force the developpers to write properly their commit message.

The pre-commit git hook exist to prettify the code before the commit. The used rules are in `<GIT_DIRECTORY>/.prettierrc.json`.

# Installation

By default, the project port will be 8082. Change `.env` with `HTTP_PORT={your_port}`. You can also setenv `HTTP_PORT` in `package.json`.

Don't forget to run `yarn install` to install all dependencies.

| Command lines           | Description                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `yarn start`            | Start the app in development mode and open the app in your default browser          |
| `yarn build`            | Build project in one package for cloud provider                                     |
| `yarn cy:open`          | Start cypress HMI to run one or multiple integration tests files (e2e)              |
| `yarn cy:run`           | Run all integration tests files in command lines (e2e)                              |
| `yarn it`               | Integration test (e2e) for working flow test in folder `.coverage/cypress-coverage` |
| `yarn ut`               | Unit test created in jest and coverage in folder `.coverage/jest-coverage`          |
| `yarn reports:move`     | Copy in folder `.coverage` reports UT and IT                                        |
| `yarn reports:merge`    | Merge reports with Nyc                                                              |
| `yarn reports:combined` | Combined reports and create new report in `.coverage/combined`                      |
| `yarn reports:coverage` | Execute all coverages commands IT/UT and move, merge and combined                   |

## Project structure

| File or folder                  | Description                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/index.tsx`                 | The entry file. This is where we import babel polyfills and render the App into the root DOM node. |
| `public/template.html`          | The only HTML file in our App. All scripts and styles will be injected here by Webpack.            |
| `src/assets/**`                 | The static assets exported to index.tsx if the latters doesn't exceed 5kb                          |
| `src/api/**`                    | Services API for managing all api requests, all data requests and response data                    |
| `src/pages/**`                  | Core application                                                                                   |
| `src/pages/App.tsx`             | Main application routes, components that need to be mounted at all times                           |
| `src/components/**`             | Directory use for independant components reusable                                                  |
| `src/types/**`                  | Interface use to define Model structures                                                           |
| `src/utils/**`                  | All the utility, helpers, constants and enums that can be used across the application              |
| Cypress section                 |                                                                                                    |
| `.coverage/cypress-coverage/**` | Lcov and html report cypress for integration test                                                  |
| `cypress/**`                    | Cypress configuration for adding plugings, instruments coverage and testing                        |
| `cypress/integration/**`        | Integration test folder                                                                            |
| Jest section                    |                                                                                                    |
| `.coverage/jest-coverage/**`    | Lcov and html report jest for unit test                                                            |
| `./jest/**`                     | Jest configuration needed for files                                                                |
| `src/components/**/*.test.tsx`  | Jest unit tests files in component                                                                 |
| Combined Tests                  |                                                                                                    |
| `.coverage/combined/**`         | Coverage IT and UT                                                                                 |

## Reminder

Usually, all comand lines take into account Windows and linux environment. But just in case an error occurs, here are a quick reminder of command lines according to it environment. To use on the 'script' section in the `package.json`.

| Windows        | Linux  | Explanation               |
| -------------- | ------ | ------------------------- |
| copy           | cp     | Copy element(s)           |
| mv             | move   | Move element(s)           |
| del            | rm     | Delete element(s)         |
| backslash \\\  | path / | Separation between folder |

## Contributor

[Alan](https://github.com/alanlachkar)

### License

[MIT](https://opensource.org/licenses/MIT)
