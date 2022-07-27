FROM node:14.16.0

COPY . .

RUN npm install
RUN npm run build --prod

EXPOSE 8082

CMD ["npm", "run", "start"]
