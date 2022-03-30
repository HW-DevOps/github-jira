FROM node
WORKDIR /ward_admission
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]
EXPOSE 7000
