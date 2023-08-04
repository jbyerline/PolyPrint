### NPM Build Stage ###
# Download NodeJS
FROM --platform=linux/amd64 node:13.12.0-alpine as build
# Set current directory to /polyprint
WORKDIR /polyprint
# Copy current project dir to /polyprint
COPY . .
#RUN ls -alh
WORKDIR /polyprint/polyprint-react
# Download all dependencies && Produce build folder
RUN npm install --legacy-peer-deps && npm run build

### Production Image Stage ###
# Download Ubuntu image
FROM ubuntu:20.04
# Download and install updates, Python 3, Pip3, and nignx
RUN apt-get update &&\
     apt-get install -y --no-install-recommends python3 &&\
     apt-get install -y --no-install-recommends python3-pip &&\
     apt-get install -y --no-install-recommends nginx

# Copy build folder to nginx HTML folder
COPY --from=build /polyprint/polyprint-react/build /usr/share/nginx/html
# Copy nginx.conf file over as default website
COPY --from=build /polyprint/polyprint-react/nginx/nginx.conf /etc/nginx/sites-enabled/default
# Open port 80 for nginx
EXPOSE 80
# Copy Flask Python files to build image
COPY --from=build /polyprint/polyprint-flask /polyprint/polyprint-flask
# Change directories into flask dir
WORKDIR /polyprint/polyprint-flask
# Install any python dependencies
RUN pip install -r ./requirements.txt
# Open port 5000 for Flask
# EXPOSE 5000

# Start nginx and Flask
CMD service nginx restart ; python3 -m flask run --host=0.0.0.0