FROM node:lts-buster

# Clone bot from GitHub
RUN git clone https://github.com/ARNOLDT20/Viper.git /root/viper-md

# Set working directory
WORKDIR /root/viper-md

# Install dependencies
RUN npm install && npm install -g pm2

# Expose port
EXPOSE 9090

# Start the bot
CMD ["npm", "start"]
