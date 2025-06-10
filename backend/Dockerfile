# Use Node.js LTS image
FROM node:18

WORKDIR /app
# RUN apk update && apk add --no-cache g++
# Copy package.json and package-lock.json
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk python3 python3-pip && \
    ln -sf /usr/bin/python3 /usr/bin/python && \
    apt-get clean

COPY package*.json ./

RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 8080

# Start the backend server
CMD ["node", "index.js"]