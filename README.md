# node-mvc

Node MVC framework to build a complete REST API system and applications, integrated with Redis cache and database (now only MongoDB is supported);

## Init

In order to correctly configure your progect type ```yarn make:env [app-name]```, then update your new `.env` file.

## Usage

You can start development enviroment for both UI and Server together or separated:

```cmd
// Start development server only
yarn dev:server

// Start development UI only
yarn dev:ui

// Start both development server and UI
yarn dev

// Start both production server and UI managed by PM2 instance
yarn start

// Restart both production server and UI managed by PM2 instance
yarn restart

// Stop both production server and UI managed by PM2 instance
yarn stop
```

## Command

This repo is served by a local command tool to build your app fast and better:

```cmd
// Create a new enviroment file to configure your new app
yarn make:env [app-name]

// Create a new model with controllers and database schema
yarn make:model [model-name]

// Create a new controller
yarn make:controller [controller-name]

// Create a new middleware
yarn make:middleware [middleware-name]

// Migrate database changes
yarn make:migration
```

In order to update your global database schema you need to run ```yarn make:migration``` everytime you have created a new model.
