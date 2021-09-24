# React Microservice

react microservice is a platform for end user. Where user can view form and contact dashboard.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```bash
#!/bin/bash
Node@v10.x.x
```

### Installing

A step by step series that will tell you how to get a development env running

```bash
#!/bin/bash
$ cd server
```

```node
#!/.nvm/versions/node/v10.15.3/bin/node
$ npm install
```

### Available Scripts

| Script                   | Description                                                                                                               |
| -------------            | ------------------------------------------------------------------------------------------------------------------------- |
| `npm run start:dev`      | Run the dev Server                                                                                                        |
| `npm run build`          | Run the prod server. It will create dist folder and under dist folder there is index.html that will be run in production. |
| `npm run test`           | Run the all test                                                                                                          |
| `npm start`              | Start the app                                                                                                             |
| `npm run test-lint`      | Run the linting test                                                                                                      |
| `npm run test-nsp`       | Run the validating modules test                                                                                           |
| `npm run test-mocha`     | Run test cases with coverage for components                                                                               |

### Export environment variables

| Variable                       | Description                                                                                                               |
| -------------------            | --------------------------------------------------------------------------------------------------------------------------|
| PORT                           | Set this variable to run your app on this port                                                                            |
| IDENTITY_SERVICE_URL           | Base url for Identity Service                                                                                             |

### Run at local server

```bash
http://localhost:8080/
```
