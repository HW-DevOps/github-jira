FROM node
WORKDIR /authentication
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "authentication.js"]
EXPOSE 5000
