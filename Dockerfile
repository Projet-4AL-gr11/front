FROM node:16.14.0
WORKDIR ./src
COPY . .

RUN npm install -g npm@8.14.0
RUN npm install -g @angular/cli
RUN npm install --legacy-peer-deps


RUN npm run build --prod


EXPOSE 8082

CMD ["npm","run", "start"]
