# Fetching the Node.js image
FROM node:14.21.3-bullseye as builder

# Setting up the work directory
WORKDIR /app

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . .

# Rebuild bcrypt for the current platform (Docker)
RUN npm rebuild bcrypt --build-from-source

# Final image
FROM node:14.21.3-bullseye

WORKDIR /app

# Copy from builder
COPY --from=builder /app .

# Exposing server port
EXPOSE 3001

# Starting our application
CMD ["npm", "run", "devStart"]
# docker run -d -p 3008:3001 kazon-backend