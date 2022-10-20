FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4000
EXPOSE 3000

CMD [ "npm", "start" ]