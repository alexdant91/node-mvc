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
- [X] Integrate socket.io notification event system;
- [ ] Build CLI tool to manage NodeMVC;
- [X] Separate auth endpoints from /api;
- [ ] Auto generated documentation systems;
- [ ] Itegrate scopes logic (like user:read ...);
- [X] Integrate Exception utility class;
- [X] Integrate optional Api App auth based on client_id e client_secret related to User inside auto-generated AuthUserClient auth service;
- [ ] Integrate optional stand alone Api App auth based on client_id e client_secret inside auto-generated AuthClient auth service;
- [X] Integrate group role system (MongoDB);
- [ ] Integrate db role system logic (MongoDB);
- [ ] Integrate group role system (PostgresSQL);
- [ ] Integrate db role system logic (PostgresSQL);
- [ ] Integrate group role system (MySQL);
- [ ] Integrate db role system logic (MySQL);
- [ ] Integrate global middleware system for all or a specific group of endpoitns;
- [X] Integrate Route method all();
- [X] Integrate custom import system;
- [X] Integrate other databases support;
- [ ] Write complete documentation;
- [ ] Refactoring exclude logic for pgsql adapter;
- [ ] Refactoring pgsql data type for arrays;
- [X] Integrate subfolder on auto generated commands;
- [ ] Integrate complete errors log system with optional email alert and pre-auth visual panel;
- [X] Write a template engine;
- [X] Integrate template engine to views directory if options is settled;
- [X] Integrate template engine system to inject components;
- [ ] Integrate an easy way to build an admin dashboard auto-generated;
- [ ] Integrate multiple entity login (User, Admin, Owner);
- [ ] Refactoring db adapter to integrate role permission logic;
- [ ] Add virtual host (subdomains) support;
- [ ] Add server mailer support;
