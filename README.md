# Clever Compose
Simple CLI used to create docker-compose files for your project based on user created templates.

## Contents
- [Background of the project](#background)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Features](#features)
- [Templates](#templates)

## Background

We like docker and docker-compose. We like them a lot. We like them so much, that we're developing this project. But why this idea? It's simple. We create a lot of compose files to run our apps in proper way, and deploy them on the server. At some point, we were starting to see, that there is no tool to help us create `docker-compose.yml` without digging into documentation, and save some repetitive services to create next compose files quicker, without running into problems and errors. So here we are in this repository.

Clever-compose helps you create `docker-compose.yml` by asking you some questions and options to choose, and at the end the CLI will create a file for you, based on yours answers! Pretty helpful right? But we didn't stop there. You can also export repeatable services from your `docker-compose.yml` files save them as a templates in CLI, and use them later. BUT WE DIDN'T STOP THERE! You can write some use special variables in exported templates, and next time - when you will be creating compose file and importing your templates - CLI will ask you for values for these variables and exports services with values typed in CLI.

## Requirements

Node Package Manager (NPM) - To install follow instructions [here](https://nodejs.org/en/) 

## Instalation

In terminal write `npm i -g clever-compose`

## Usage

- If you want to create docker-compose based on prepared questions and options, just type:
```shell
> clever-compose
```
 - If you want to export service from docker-compose which then can be imported in cli use:
 ```shell
> clever-compose -e <docker-compose_path>
```

## Development

### Instalation

* Clone project
* `npm install`

### Commands

Run `npm run <script>`

### Scripts:
* `build` - builds project
* `build:watch` - builds project which reloads on save
* `lint` - check for style problems
* `lint:watch` - run linting which reloads on save
* `fix` - fix simple code style problems with eslint
* `dev` - run application
* `dev:watch` - run development server which reloads on save
* `test:unit` - run unit tests
* `test:watch` - run tests which reloads on save

## Features

1. Simple questions and options help you crate `docker-compose.yml` with low effort:
<!-- GIF HERE -->

2. Export service, and import it later:
<!-- GIF HERE -->

3. Use variables in template, to fill them with values in CLI:
<!-- GIF HERE -->

## Templates
1. Let's assume, that you have `docker-compose.yml` file which looks like this:
```yaml
version: '3'
services:
  my_app_postgres:
    container_name: my.app.postgress
    image: postgres:latest
    env_file:
     - env
    expose:
     - "5432"

  my_app_django:
    container_name: my.app.django
    build: ./django
    ports:
      - "3000:3000"
    env_file:
     - env
    volumes:
     - ./django:/app
    depends_on:
     - my_app_postgres

  my_app_redis:
    container_name: my.app.redis
    restart: unless-stopped
    image: redis:latest
    expose:
    - "6379"
```

2. Go to directory with this file and type command:
```
> clever-compose -e ./docker-compose.yml
```

3. Clever-compose will ask you a question:
```
? Select services to extract
( ) my_app_postgres
( ) my_app_django
( ) my_app_redis
```

4. Select services (fe. `my_app_postgres`) to export. CLI will export them to dir: `$HOME/clever-compose/templates`

5. Go to there, and edit `my_app_postgres.yml` with something like this:
```yaml
my_app_postgres:
    container_name: my.app.postgress
    image: postgres:latest
    env_file:
     - ${env_file}
    expose:
     - "${expose_port}"
```

6. Next time, when you will be creating docker-compose (with 3-4 services) and you will try to import this template as one of the services, CLI will ask you to provide values for `env_file` and `expose_port`.

Thanks to that you don't need to copy, paste and replace some text about this service made from postgres db. You need to fill only values, that you specified.