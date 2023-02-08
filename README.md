# RBAC Backend

## ⛓️ Installation

follow these steps:

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
touch .env
# open .env and modify the environment variables (if needed)
```

Docker Compose Commands:

```bash
docker compose build
```
```bash
docker compose up
```

## 📑 Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Linting](#linting)

## 🪶 Features

- **SQL database**: [PostgreSQL](https://www.postgresql.org/) object relational mapping using [TypeORM](https://typeorm.io/)
- **Validation**: schema declaration and validation using [zod](https://zod.dev/)
- **Error handling**: centralized error handling mechanism
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv), 
[config](https://github.com/node-config/node-config) and [envalid](https://github.com/af/envalid)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## 🪟 Commands

Running locally:

```bash
yarn run dev
```

Running in production:

```bash
yarn start
```

## 👽 Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
    PORT*
    NODE_ENV*
    POSTGRES_HOST*
    POSTGRES_PORT*
    POSTGRES_USER*
    POSTGRES_PASSWORD*
    POSTGRES_DB*
    JWT_ACCESS_TOKEN_PRIVATE_KEY*
    JWT_REFRESH_TOKEN_PRIVATE_KEY*
```

## 🚧 Project Structure

```
src\
 |--controllers\    # Route controllers (controller layer)
 |--entities\       # TypeORM Entities (data layer)
 |--middlewares\    # Custom express middlewares
 |--migrations\     # PostrgreSQL Database migrations
 |--routes\         # Routes
 |--schemas\        # Schema declaration and validation
 |--services\       # crud services for controller
 |--utils\          # Utility classes, functions and data-source for DB
 |--index.ts        # App entry point
```

### 🅿️ API Endpoints

List of available routes:

**Auth routes**:\
`POST /api/auth/register` - signup\
`POST /api/auth/login` - login\
`GET /api/auth/refresh` - refresh auth tokens\
`GET /api/auth/logout` - logout\

**User routes**:\
`GET api/user/me` - get user profile\

<!-- Complete Api Documentation :[Click here](https://documenter.getpostman.com/view/15600448/UVe9RUeh) -->

## ⁉️ Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

The error handling middleware sends an error response, which has the following format:

```json
{
  "status": 404,
  "message": "Not found"
}
```

## 🪝 Validation

Request data is validated using [zod](https://zod.dev/).
The validation schemas are defined in the `src/schemas` directory and are used in the routes by providing them as parameters to the `validate` middleware.

## ☑️ Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`
