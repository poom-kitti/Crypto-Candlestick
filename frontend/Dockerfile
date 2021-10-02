FROM node:14.15.5-alpine3.13
WORKDIR '/app'
COPY . .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]