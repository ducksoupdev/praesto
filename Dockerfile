FROM node:4.4.7

# Create app directory
RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@3.10.6

ENV HOME=/home/app

# Install app dependencies
COPY package.json $HOME/praesto/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/praesto
RUN npm install
RUN npm install -g forever

USER root
COPY . $HOME/praesto
RUN chown -R app:app $HOME/*
USER app

EXPOSE 3000
CMD ["forever", "start", "--minUptime", "1000", "--spinSleepTime", "1000", "./bin/www"]
