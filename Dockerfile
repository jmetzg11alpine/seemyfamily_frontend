FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV NODE_ENV development
# ENV REACT_APP_API_URL=http://localhost:8000
ENV REACT_APP_API_URL=https://seemyfamily.net/api/

EXPOSE 3000

CMD ["npm", "start"]
