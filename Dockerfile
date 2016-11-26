FROM node:argon


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install yarn -g
RUN yarn install
COPY wwwroot /usr/src/app

EXPOSE 8080

CMD [ "npm", "start" ]