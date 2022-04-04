FROM node:14.17.0-alpine
WORKDIR /var/www/frontend
COPY . /var/www/frontend
RUN npm install
RUN npm run build

EXPOSE 4200

# start run in development environment
# RUN [ "npm", "run", "start" ]
