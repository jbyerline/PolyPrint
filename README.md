# Welcome to PolyPrint!

 <p align="center">
    <img src="https://user-images.githubusercontent.com/47374239/150470183-31f4f1fc-9bb5-45f4-ba18-30adfcb87549.png" alt="alternate text">
 </p>

This project was created by Jacob Byerline. Initially it was my final project for my master’s degree. I have continued adding to it and 
plan to keep it up to date for as long as I can manage. This project is currently in Alpha and will contain a lot of bugs. I 
will do my best to get to them as I can but please be patient and feel free to submit issues and PRs. 

## What is PolyPrint

PolyPrint is a 3D printer Web GUI for managing multiple 3D printers. It is a React based web application that uses 
the OctoPrint API to centrally manage your entire printer collection. 

This service is not designed to manage commercial print farms. Rather it is designed for Hobbyists and Enthusiasts with multiple
3D printers to easily keep control and track of their printers.

## Run DEV environment
Polyprint consists of 3 parts:
- The React website
- The Flask API
- The NGINX Reverse Proxy

### Follow these steps to run and test locally
1. Clone the repo from [here](https://github.com/jbyerline/PolyPrint/)
2. `cd` into the cloned repo
3. `cd` into `polyprint-dev-nginx`
4. Run `docker compose build`
5. Run `docker run -d -p 80:80 --name polyprint-nginx registry.byerline.me/polyprint-nginx-dev:0.0.1`
   - This will start the NGINX server on your local machine, port `80`
   - This image can also be run inside of Docker Desktop
6. Execute the Flask server. Be sure it is running on port `5050`
   - I use Jetbrains PyCharm for this
7. Execute the ReactJS server. Be sure it is running on port `3000`
   - I use Jetbrains WebStorm for this
8. Access your locally running PolyPrint server at [http://127.0.0.1:80](http://127.0.0.1:80)

## How to build new version of PolyPrint
1. Increment version number in `.env` & `package.json`
2. Commit changes to git
3. Run `docker compose build` from **ROOT** directory!
4. [OPTIONAL] Once build is complete, copy image name from docker terminal output and run `docker push [image name]`
    - Ex. `docker push registry.byerline.me/polyprint-react:0.0.1 `

## How to deploy PolyPrint
1. Run `docker pull [image name]` with the latest tag to get the latest version
    - Ex. `docker pull registry.byerline.me/polyprint-react:0.0.1 `
2. Run `docker run -d -p [desired host port]:80 --name polyprint [image name]` to start up on your desired port
   - Ex. `docker run -d -p 1234:80 --name polyprint registry.byerline.me/polyprint:0.0.12` running on port 1234
   - Alternatively, you can run this image using Docker Desktop or Portainer
3. [OPTIONAL] Set up a reverse proxy on your host machine to access PolyPrint from a public facing domain

## How to configure PolyPrint
Inside the folder you unzipped there is a file titled `PrinterConfig.json` you will need to modify this file to
set your username and password as well as enter the details for each of your OctoPrint printers. 

The entry must be in valid JSON syntax. The order in which you enter your printers will determine the order of
appearance on the dashboard

1. The `username` is whatever you want your username to be.
2. The `password` is whatever you want your password to be.
3. The `name` is whatever you wish to label the printer in this dashboard.
4. The `URL` is the domain or the IP address of your printers octoprint instance.
5. The `apiKey` is generated from OctoPrint inside settings -> API -> Global API Key
6. [Optional] The `octoLight` field is for the OctoLight plugin for
      OctoPi and must be installed on your RPI for this functionality. It allows you
      to toggle a light attached to your Raspberry Pi's GPIO.
7. [Optional] The `colorCode` field is for specifying the avatar color for a given printer. If none 
is provided it will use the color chosen within the appearance settings in the OctoPrint UI. This was
put into place to give more color options for each of your printers rather than having a set selection
to choose from.

```json
{
  "credentials": {
    "username": "admin",
    "password": "password"
  },
  "printers": [
    {
      "name": "Demo Printer 1",
      "URL": "https://my.octoprint.url",
      "apiKey": "abc...xyz",
      "octoLight": true,
      "colorCode": "#FC6D09"
    },
    {
      "name": "Demo Printer 2",
      "URL": "http://192.168.1.25",
      "apiKey": "abc...xyz"
    }
  ]
}

```

### **NOTE**: While inside OctoPrint settings -> API, Please enable CORS as it is required to run this site!

### You will NOT be able to continue into the dashboard until your config file is valid!
![Setup](https://user-images.githubusercontent.com/47374239/150470063-744b93d6-9476-486a-b97a-ba32552a2552.png)
![PolyPrint](https://user-images.githubusercontent.com/47374239/150470009-9308ad61-0537-4a2e-8a86-7fadb1275683.png)
