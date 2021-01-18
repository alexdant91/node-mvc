# node-mvc

Node MVC framework to build a complete REST API system and applications, integrated with Redis cache and database (now only MongoDB is supported);

## Usage

You can start development enviroment for both UI and Server together or separated:

```
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

```
// Create a new model with controllers and database schema
yarn make:model

// Create a new controller
yarn make:controller

// Create a new middleware
yarn make:middleware

// Migrate database changes
yarn make:migration
```

In order to update your global database schema you need to run ```yarn make:migration``` everytime you have created a new model.

## TODO

Following the coming soon features list.

- [X] Refactor mongoose model retrieve with a migration command (static models generator);
- [X] Refactor vendor/Model class, it contains only middleware;
- [X] User authorization flow;
- [X] Basic UI scaffold, using Vue.js, showing user auth system;
- [X] Basic UI scaffold, using Vue.js, showing CRUD operations;
- [X] Adapt UI scaffold design to be device;
- [X] Integrate auth detection in Models methods;
- [X] Integrate Redis server;
- [X] Integrate PM2 as production manager;
- [ ] Integrate factories functionality for UI scaffold (User, Auth);
- [ ] Integrate socket.io event system (?);
- [ ] Build CLI tool to manage NodeMVC;
- [X] Separate auth endpoints from /api;
- [ ] Auto generated documentation systems;
- [ ] Itegrate scopes logic (like user:read ...);
- [X] Integrate Exception utility class;
- [ ] Integrate optional Api App auth based on client_id e client_token;
- [ ] Integrate global middleware system for all or a specific group of endpoitns;
- [X] Integrate Route method all();
- [X] Integrate custom import system;
- [ ] Integrate other databases support;
