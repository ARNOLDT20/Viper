FROM node:18-slim

RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  ffmpeg \
  webp && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies first to leverage Docker cache
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy rest of the app
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
