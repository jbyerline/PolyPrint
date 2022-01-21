# Welcome to PolyPrint!

 <p align="center">
    <img src="https://user-images.githubusercontent.com/47374239/150470183-31f4f1fc-9bb5-45f4-ba18-30adfcb87549.png" alt="alternate text">
 </p>

This project was created by Jacob initially as my a project for my masters degree. I have continued adding to it and 
plan to keep it up for as long as I can manage. This project is currently in Alpha and will contain a lot of bugs. I 
will do my best to get to them as I can but please be patient and feel free to submit issues and PRs. 

## What is PolyPrint

PolyPrint is a 3D printer Web GUI for managing multiple 3D printers. It is a React based web application that uses 
the OctoPrint API to centrally manage your entire collection. 

This service is not designed to manage commercial print farms. Rather it is for Hobbyists and Enthusiasts with multiple
3D printers to easily keep track of their prints. 

## How to set up PolyPrint server
1. Install `npm` on your system of choice. (A raspberry Pi works fine)
2. Run `npm i serve` to install the static web server
3. Download the latest release .zip from [here](https://github.com/jbyerline/PolyPrint/releases/)
4. Unzip the file into your desired directory
5. Run `serve -s build` where "build" is the folder you unzipped

This will start a static web server located at [http://localhost:3000](http://localhost:3000)

## How to configure PolyPrint
Inside the folder you unzipped there is a file titled `PrinterConfig.json` you will need to modify this file to
match the details of each of your OctoPrint printers. 

The entry must be in valid JSON syntax. The order in which you enter your printers will determine the order of
appearance on the dashboard

1. The name is whatever you wish to label the printer in this dashboard.

2. The URL is the domain or the IP address of your printers octoprint instance.

3. The apiKey is generated from OctoPrint inside settings -> API -> Global API Key

```json
{
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
