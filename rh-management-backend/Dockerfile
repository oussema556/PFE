FROM node:14.17.0-alpine
WORKDIR /var/www/backend
# RUN npm install
COPY . /var/www/backend

RUN npm install
EXPOSE 3000

# start run in development environment
# CMD [ "npm", "run", "start:dev" ]