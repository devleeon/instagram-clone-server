FROM node:14

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


ADD nginx.conf.sigil /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json yarn.lock ./


RUN yarn

COPY ./src ./src

COPY . .

COPY .env.production .env

RUN yarn gen
RUN yarn build

ENV NODE_ENV production

EXPOSE 8080

CMD [ "yarn", "start" ]

USER node 