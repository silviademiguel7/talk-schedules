#First step

FROM node:14-alpine as build-step
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build --prod

#Second step

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/talk-schedules /usr/share/nginx/html