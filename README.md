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

## How do I run PolyPrint?
1. Ensure you have [Docker]("https://www.docker.com/") installed on your host machine
2. Run `docker pull [image name]` with the latest tag to get the **[latest version]("https://github.com/jbyerline/PolyPrint/tags")**
    - Ex. `docker pull registry.byerline.me/polyprint:1.0.2 `
2. Run `docker run -d -p [desired host port]:80 --name polyprint [image name]` to start up on your desired port
   - Ex. `docker run -d -p 1234:80 --name polyprint registry.byerline.me/polyprint:1.0.2` running on port 1234
   - Alternatively, you can run this image using Docker Desktop or Portainer
3. [OPTIONAL] Set up a reverse proxy on your host machine to access PolyPrint from a public facing domain

## How to configure PolyPrint
PolyPrint is based around a file titled `config.json` you will need to modify this file to
set your username and password as well as enter the details for each of your OctoPrint printers. 

### Steps:
#### Step 1:
When you first run the application, you will be prompted to enter your username and password. This will be `admin` for
the username and `password` for the password by default.

**Note:** You can change this in the `config.json` file. Please see the example file provided below. 
#### Step 2:
Simply make a new file called `config.json` and copy the contents of the example file below into it. 
#### Step 3:
Modify the JSON fields to match your printers information. See **Field Definitions** section below. 

**Note:** The entry must be in valid JSON syntax. Check JSON syntax [here]("https://codebeautify.org/jsonviewer"). The order in which you enter your printers will determine the order of
appearance on the dashboard
#### Step 4:
After logging in, you will be prompted to upload a config.json file, this will be the recently modified file.

#### Step 5:
You should now see your printers on the dashboard. 

#### Troubleshooting:
If you do not see your printers or the page crashes, your json may be wrong. To reset the config back to default go to `http://[yourPolyPrintIpOrDomain]/api/reset`, then re-upload and try again. 

### Field Definitions:
1. The `username` is whatever you want your username to be.
2. The `password` is whatever you want your password to be.
3. The `name` is whatever you wish to label the printer in this dashboard.
4. [Optional] The `publicUrl` is a fully qualified domain name that points to your OctoPrint instance.
5. The `privateIp` is the local IP address of your printer.
6. The `apiKey` is generated from OctoPrint inside settings -> API -> Global API Key
7. [Optional] The `octoLight` field is for the OctoLight plugin for
      OctoPi and must be installed on your RPI for this functionality. It allows you
      to toggle a light attached to your Raspberry Pi's GPIO.
8. [Optional] The `colorCode` field is for specifying the avatar color for a given printer. If none 
is provided it will use the color chosen within the appearance settings in the OctoPrint UI. This was
put into place to give more color options for each of your printers rather than having a set selection
to choose from.

#### Note: The `optional` fields should not be included in the `config.json` file if you do not wish to use them.

### Example config.json:
```json
{
  "credentials": {
    "username": "admin",
    "password": "password"
  },
  "printers": [
    {
      "name": "Demo Printer 1",
      "publicUrl": "https://my.octoprint.url",
      "privateIp": "http://10.0.0.50:5000",
      "apiKey": "abc...xyz",
      "octoLight": true,
      "colorCode": "#FC6D09"
    },
    {
      "name": "Demo Printer 2",
      "privateIp": "http://192.168.1.25",
      "apiKey": "abc...xyz"
    }
  ]
}

```

### **NOTE**: While inside OctoPrint settings -> API, Please enable CORS as it is required to run this site!

### You will NOT be able to continue into the dashboard until your config file is valid!

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


![Setup](https://user-images.githubusercontent.com/47374239/150470063-744b93d6-9476-486a-b97a-ba32552a2552.png)
![PolyPrint](https://user-images.githubusercontent.com/47374239/150470009-9308ad61-0537-4a2e-8a86-7fadb1275683.png)
