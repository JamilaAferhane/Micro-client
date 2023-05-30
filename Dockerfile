# Base image
FROM node:18-alpine AS builder
ENV NODE_ENV=development
ENV NEXT_PUBLIC_API_URL=http://gateway:5005/api
# Set working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
# update npm 
RUN npm install -g npm@9.6.6
# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire project
COPY . .
# Build the Next.js project

RUN npm run build
# Remove development dependencies
# RUN npm prune --production

# Final image
FROM node:18-alpine
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://gateway:5005/api
# Set working directory
WORKDIR /app
# update npm 
RUN npm install -g npm@9.6.6


# Copy build from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
RUN npm install --only=production --legacy-peer-deps
# Expose the desired port (replace 3000 with your Next.js port)
EXPOSE 3000
# Run the Next.js application
CMD ["npm", "run", "start"]
