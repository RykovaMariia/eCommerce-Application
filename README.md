# RSS eCommerce Application

## General

Welcome to our eCommerce application! This platform is dedicated to providing a digital shopping experience for eco-friendly products 🏪. We offer a comprehensive online shopping portal that allows users to explore and purchase a wide variety of environmentally conscious items. From sustainable home goods to organic clothing, our application ensures a seamless journey from product discovery to checkout. We strive to enhance user engagement and boost confidence in making eco-conscious purchases, all within a user-friendly and interactive environment 🚀.

## Goals

The main objective of this project is to deepen and master knowledge in TypeScript/Front-end development and apply this knowledge practically while developing an e-commerce application for eco-friendly products. Additionally, our aim is to become familiar with modern tools and frameworks commonly used in web application development.

Our platform showcases the latest trends in eco-friendly products, allowing you to explore and choose the perfect sustainable items for your home or office. With user-friendly features and an aesthetically pleasing interface, we strive to create an immersive shopping experience that caters to all your eco-friendly needs.

# Technology Stack ⚙️

## Frontend:

- [Vuetify](https://vuetifyjs.com/en/) - is an Open Source UI Library with beautifully handcrafted Vue Components
- [Pinia](https://pinia.vuejs.org/) - a store library for Vue, it allows you to share a state across components/pages
- [Vue](https://vuejs.org/) - an approachable, performant and versatile framework for building web user interfaces
- [TypeScript](https://www.typescriptlang.org/) - a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale

## Backend:

- [Commercetools](https://docs.commercetools.com/) - The API

## Additional instruments and technologies:

- [Vite](https://vitejs.dev/) - project bundler
- [SASS(SCSS)](https://sass-lang.com/) - CSS pre-processor with additional features
- [Prettier](https://prettier.io/) - automatic code formatting to a single style
- [ESLint](https://eslint.org/)- a linter that provides a consistent code style
- [Vitest](https://vitest.dev/) - testing framework
- [Husky](https://typicode.github.io/husky/) - tool that automatically lint commit messages, code, and run tests upon committing or pushing
- [Git](https://git-scm.com/) - version control system and project repository management
- [GitHub](https://pages.github.com/) - the complete developer platform to build, scale, and deliver secure software
- [VS Code](https://code.visualstudio.com/) - code editor
- [Postman](https://www.postman.com/) - The API Testing Tool

# Available Scripts ✨

In the project directory, you can run:

```
npm run dev
```

Runs the app in the development mode.

```
npm run build
```

Builds the app for production into the dist folder with type checking of the app with TypeScript.

```
npm run preview
```

Preview the production build locally

```
npm run test
```

Launches the test runner in the interactive watch mode.

```
npm run test:run
```

Launches the tests once, without monitoring file changes

```
npm run type-check
```

Type check the App with TypeScript

```
npm run build-only
```

Builds the app for production to the build folder (dist).

```
npm run lint
```

Lint the App with ESlint

```
npm run format
```

This script run Prettier to identify potential errors, violations and fix issues that can be fixed automatically

```
npm run format:check
```

Runs to scan the code base with Prettier analyzes the code files in the project and checks their formatting for compliance with the established rules

```
npm run stylelint
```

Runs a scan on your codebase using the Stylelint

```
npm run stylelint:fix
```

Run this script to make Stylelint not only to identify potential errors and violations but also automatically to fix as many of these issues as possible

```
npm run prepare
```

Install Husky to enable pre-commit hooks

# Setup and Running ⚠️

What do you need to do to run our project locally?

1. Use node `20.x` or higher.
2. Install `Git` on your computer.
3. Install Code Editor of your choice.
4. Clone this repository to your local computer.
5. Install all dependencies using `npm ci`.
6. Create the project in [Commercetools](https://docs.commercetools.com/), setting up the necessary authorization, currencies, languages, and other configurations in the `Merchant Center`.
7. Create the `API client` for CommerceTools, enabling access to the platform's APIs and managing permissions and scopes required for the project.
8. Save your API environment variables file `.env` in the project directory.
9. Finally run a development server: `npm run dev`
