# RSS eCommerce Application

## General
Welcome to our eCommerce application! This platform aims to recreate the experience of shopping for furniture in a digital environment 🏪. It provides a comprehensive online shopping portal that offers users an interactive and seamless experience. From the moment you start exploring our wide variety of furniture products to the final checkout process, our application ensures a smooth journey that enhances user engagement and boosts confidence in making purchases 🚀.

## Goals
The primary goal of this project is to deepen and master knowledge in TypeScript/Front-end development and apply this knowledge in practice while developing an e-commerce application. Additionally, we aim to familiarize ourselves with modern tools and frameworks commonly used in web application development. 
Our platform showcases the latest trends in furniture design, allowing you to discover and select the perfect pieces for your home or office. With user-friendly features and a visually appealing interface, we strive to provide an immersive shopping experience that caters to all your furniture needs.

# Technology Stack ⚙️

## Frontend:
* HTML/CSS/TypeScript
* Vue - for user interface creation
* TypeScript - The Language 

## Backend:
* Commercetools - The API

## Additional instruments and technologies:
* Vite - project bundler
* SASS(SCSS) - CSS framework with additional features
* Prettier - automatic code formatting to a single style
* ESLint - detecting errors and enforcing a consistent code style
* Vitest - code testing
* Husky - running certain scripts before commits/pushes
* Git - for version control and project repository management
* GitHub - for hosting the repository
* VS Code - code editor
* Postman - The API Testing Tool 

# Available Scripts ✨
In the project directory, you can run:

```
npm run dev
```
Runs the app in the development mode.

```
npm run build
```
Builds the app for production to the build folder with type check the App with TypeScript.

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
Launches the test tests once, without monitoring file changes

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
This script to make Prettier not only to identify potential errors and violations but also automatically to fix as many of these issues as possible

```
npm run format:check
```
Scan on your codebase using Prettier. Prettier analyzes the code files in the project and checks their formatting for compliance with the established rules

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
What things do you need to do in order to run our project locally? 

1. Use node `18.x` or higher.
2. Installed `.git` on your computer.
3. Code Editor of your choice.
4. Installed `npm`.
5. Clone this repository to local computer or download zip file manually with our repository.
6. Install all dependencies use `npm install`.
7. Create the project in `CommerceTools`, setting up the necessary authorization, currencies, languages, and other configurations in the `Merchant Center`.
8. Create the `API client` for CommerceTools, enabling access to the platform's APIs and managing permissions and scopes required for the project.
9. Save your API environment variables file `.env` in the project directory.
10. Finally run a development server: `npm run dev`