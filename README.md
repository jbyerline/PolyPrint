# Welcome to PolyPrint!

 <p align="center">
    <img src="https://user-images.githubusercontent.com/47374239/150470183-31f4f1fc-9bb5-45f4-ba18-30adfcb87549.png" alt="alternate text">
 </p>

This project was created by Jacob Byerline. Initially it was my final project for my masters degree. I have continued adding to it and 
plan to keep it up to date for as long as I can manage. This project is currently in Alpha and will contain a lot of bugs. I 
will do my best to get to them as I can but please be patient and feel free to submit issues and PRs. 

## What is PolyPrint

PolyPrint is a 3D printer Web GUI for managing multiple 3D printers. It is a React based web application that uses 
the OctoPrint API to centrally manage your entire printer collection. 

This service is not designed to manage commercial print farms. Rather it is designed for Hobbyists and Enthusiasts with multiple
3D printers to easily keep control and track of their printers.

## How to set up PolyPrint server
1. Install `npm` on your system of choice. (A raspberry Pi works fine)
2. Run `npm i serve` to install the static web server
3. Download the latest release .zip from [here](https://github.com/jbyerline/PolyPrint/releases/)
4. Unzip the file into your desired directory
5. Run `serve -s build` where "build" is the folder you unzipped

This will start a static web server located at [http://localhost:3000](http://localhost:3000)

## How to make PolyPrint start on boot (Linux)
1. Create a systemd unit file `sudo nano /etc/systemd/system/polyprint.service`.
2. Paste the following code into the nano editor:
    1. Change \<yourUser\> to be your actual linux username.
    2. Change <path/to/PolyPrint.sh> to be the full path to the shell script downloaded from this repo. 
 ```
[Unit]
Description=PolyPrint Dameon
 
[Service]
User=<yourUser>
ExecStart=<path/to/PolyPrint.sh>
Type=simple
TimeoutStopSec=10
Restart=on-failure
RestartSec=5
 
[Install]
WantedBy=multi-user.target
 ```
3. Run `sudo  chmod u+x path/to/PolyPrint.sh` to make sure script is executable.
4. Run `sudo systemctl start polyprint` to start the service for the first time.
5. Run `sudo systemctl stop polyprint` to stop the service so we can enable it.
6. Run `sudo systemctl enable polyprint` to enable the service to run on boot.
7. Reboot the system to verify or run `sudo systemctl start polyprint` to start the service again.
 
 
## How to configure PolyPrint
Inside the folder you unzipped there is a file titled `PrinterConfig.json` you will need to modify this file to
set your username and password as well as enter the details for each of your OctoPrint printers. 

The entry must be in valid JSON syntax. The order in which you enter your printers will determine the order of
appearance on the dashboard

1. The username is whatever you want your username to be.
2. The password is whatever you want your password to be.
3. The name is whatever you wish to label the printer in this dashboard.
4. The URL is the domain or the IP address of your printers octoprint instance.
5. The apiKey is generated from OctoPrint inside settings -> API -> Global API Key

```json
{
  "credentials": {
    "username": "admin",
    "password": "password"
  },
  "printers": [
    {
      "name": "Demo Printer",
      "URL": "https://my.octoprint.url",
      "apiKey": "F704DCD954D1417B95B9D57014D05357"
    },
    {
      "name": "Other Demo Printer",
      "URL": "192.168.1.25",
      "apiKey": "3863CCB8989C4D84957897157D964699"
    }
  ]
}
```

### NOTE: While inside OctoPrint settings -> API, Please enable CORS as it is required to run this site!

### You will NOT be able to continue into the dashboard until your config file is valid!
![Setup](https://user-images.githubusercontent.com/47374239/150470063-744b93d6-9476-486a-b97a-ba32552a2552.png)
![PolyPrint](https://user-images.githubusercontent.com/47374239/150470009-9308ad61-0537-4a2e-8a86-7fadb1275683.png)
