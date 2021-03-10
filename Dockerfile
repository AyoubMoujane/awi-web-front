FROM node:14
WORKDIR /app
ADD . /app
RUN npm install
RUN npm run build
EXPOSE 5000
CMD serve -s build