#Specify a base image
FROM node:alpine

WORKDIR /usr/app
#Copy everything from source directory (simpleweb) to the directory created 

#Install some dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./
#Default command
CMD ["npm","start"]