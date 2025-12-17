FROM node:lts-buster

# Clone bot from GitHub
RUN git clone https://github.com/newwrld-dev/POPKID-XTR.git /root/popkid-xtr-bot

# Set working directory
WORKDIR /root/popkid-xtr-bot

# Install dependencies
RUN npm install && npm install -g pm2

# Expose port
EXPOSE 9090

# Start the bot
CMD ["npm", "start"]
