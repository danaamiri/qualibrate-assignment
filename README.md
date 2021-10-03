# Qualibrate Shows Application

A Show Discovery Application for the Qulibrate Interview Assignment Challenge. The project is a user interface for the TVMaze Open API to show a list of TV Shows and their Details.

## Project Description And Structure

The project was developed with Vue 2 library using typescript and is using npm for dependency management and running. The app contains 2 main components to show a list of The Shows and their Details and also other utils and components to provide API calls, error handling, etc.


The project structure is described below:

```
.src
+
+--- /assets // images and svg files
+--- /models // API Entity Models
+--- /router // Vue router config
+--- /services // Services for api call and providing data
+--- /utils
    +
    +--- /api // api client intializer and assets
    +--- /components // Loading and NotFound components
    +--- /filters // runtime Duration filter 
    
+--- /components
    +
    +--- /show-details-component // Show Details Container View
    +--- /shows-list-component // Shows List Container View
    
+--- App.vue // Root View
+--- main.ts // Main start point of the application
```

#### Libraries and Dependencies

```
"axios": "^0.22.0", // Api Client
"bootstrap": "^5.1.1",  // Grids and Reponsivenes
"bootstrap-vue": "^2.21.2", // Grids and Reponsivenes
"rxjs": "^6.6.7",  // Observable and Pipes usage
"vue": "^2.6.11",  
"vue-class-component": "^7.2.3",  
"vue-property-decorator": "^9.1.2",  
"vue-router": "^3.2.0",  // Routing
"vue-rx": "^6.2.0" // Observable and Pipes usage
```

## Running The Application

There are two ways to run this application: npm or docker. both ways are explained below:

### NPM


> **_NOTE:_**  To run the application using npm, make sure you have the ``node`` (at least the 11 version) installed on your computer.

After cloning the project, redirect to the root directory of the project and run the commands below:
```
$ npm install
```
After the dependency installation is complete, you can run the application using:
```
$ npm run serve
```

The Application by default runs on port 8080. So make sure that the port is not in use or change port by running the last command like this:
```
$ npm run serve -- --port <YOUR_PORT>
```

### DOCKER
> **_NOTE:_**  To run the application using Docker, make sure you have the Docker installed, and the daemon is up and running on your computer.

After cloning the project, redirect to the root directory of the project and run the commands below:
```
$ docker build -t qualibrate/qulibrate-show:1.0.0 .
```
After the image is created you can run the application using this command:
```
$ docker run -d -p <YOUR_PORT>:80 --name qulibrate-show qualibrate/qulibrate-show:1.0.0
```

## License
This application is open-sourced and free to use and develop for everyone.
