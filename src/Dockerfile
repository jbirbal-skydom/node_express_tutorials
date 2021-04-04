# 2021MAR26
# VUE dockerized version

FROM node:latest
RUN npm install -g http-server 
RUN npm install -g @vue/cli 


# create a workspace directory
RUN mkdir -p /node_express_tutorials/src

# change to the corresponding directory
WORKDIR /node_express_tutorials/src
# RUN vue UI

COPY . .

# RUN npm install 

# RUN npm run build 

CMD http-server -p 8081

# Expose port 8081
EXPOSE 8081

# docker build . -t openjscad
