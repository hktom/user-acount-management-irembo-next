# Base image
FROM node:18.18.0-alpine

# Install dependencies
RUN apk add --no-cache bash
# RUN npm install -g npm@9.7.1 && npm install -g yarn

# Set working directory
WORKDIR /app

# Copy files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy source code
COPY . .

# Build the app
RUN yarn build

# Expose port
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
