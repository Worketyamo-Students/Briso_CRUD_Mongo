# @worketyamo/ts-starter

## Overview

`@worketyamo/ts-starter` is a TypeScript starter project designed to simplify the development of Express.js applications. This starter kit includes essential configurations and dependencies to help you get started quickly, while enforcing code quality and consistency standards with ESLint and Prettier.

## Features

- TypeScript for static typing and advanced code intelligence
- Express.js for creating robust APIs and web applications
- ESLint and Prettier for code quality and formatting
- Environment variable support with dotenv and env-var
- Compression middleware to improve performance
- Rate limiting middleware to protect your application
- Swagger integration for API documentation

## Prerequisites

- Node.js >= 20.12.0
- Yarn >= 1.22.19

> Note : Use Yarn for this project..

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/worketyamo/ts-starter.git
cd ts-starter
yarn install
```

### Exécution en mode développement

To start the development server with automatic restarts on file changes, use:

```bash
yarn dev
```

### Compilation du projet

To compile the project for production, use:

```bash
yarn build
```

### Démarrage de l'application

To start the application after compilation, use:

```bash
yarn start
```

## Scripts

- **dev** : Starts the development server with ts-node-dev
- **build** :  Cleans the dist folder and compiles TypeScript code
- **start** : Runs the compiled JavaScript code from the dist folder

## Utilisation


Starting the Server
To start the server, run the following command:

```bash
yarn start
```
The server will be launched on port: http://localhost:3000

API Documentation
The API documentation is accessible at the following address :

```sh
http://localhost:3000/api-docs
 ```

## License

This project is licensed under WORKETYAMO.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request.

## Auteur

Kouam Brice

## Informations supplémentaires

For any questions or additional support, please contact the project maintainers.
