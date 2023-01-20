# build stage
# Download NodeJS
FROM --platform=linux/amd64 node:13.12.0-alpine as build
# Set current directory to /polyprint
WORKDIR /polyprint
# Copy current project dir to /polyprint
COPY . .
RUN ls -alh
WORKDIR /polyprint/polyprint-react
# Download all dependencies && Produce build folder
RUN npm install --legacy-peer-deps && npm run build

FROM --platform=linux/amd64 ubuntu:20.04
RUN apt-get update &&\
     apt-get install -y --no-install-recommends python3 &&\
     apt-get install -y --no-install-recommends python3-pip &&\
     apt-get install -y --no-install-recommends nginx

# Copy build folder to nginx HTML folder
COPY --from=build /polyprint/polyprint-react/build /usr/share/nginx/html
# Copy nginx.conf file over as defaul.conf
COPY --from=build /polyprint/polyprint-react/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Serve on port 80
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]

COPY --from=build /polyprint/polyprint-flask /polyprint/polyprint-flask
WORKDIR /polyprint/polyprint-flask
RUN pip install -r ./requirements.txt
EXPOSE 5000
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]