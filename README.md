# node_express_tutorials
Multiple VUE tutorials

### Credit goes to: https://daten-und-bass.io/blog/getting-started-with-vue-cli-on-docker/


# use a docker host bind to the disk of your e.g. laptop
docker run -itd -v /path/on/host:/path/in/container node:10.9-slim
```
docker ps
docker exec -it <container_id> /bin/bash
    # now inside the container
	cd /path/in/container
	npm install -g @vue/cli
	vue create your-app
        # pick your choices now or stick with the default config
        # After the installation you should see something like
            # Vue CLI v3.0.1
            # yarn install v1.9.2
    exit
docker rm -f <container_id>
```

Now the container has written your app directory to /path/on/host/your-app. Now with the code "locally" available we can create a basic Dockerfile:

```
FROM node:10.9-slim

# not mandatory if you EXPORT a fixed port. See below.
ARG YOUR_APP_WEB_HTTP_PORT

RUN apt-get -y update \
	&& apt-get install -y git

RUN yarn global add @vue/cli -g

WORKDIR /path/in/container/your-app

RUN apt-get autoremove -y \
    && apt-get autoclean -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Or just use EXPORT 8080
EXPOSE ${YOUR_APP_WEB_HTTP_PORT}
# If yout want use vue-cli UI you need to also EXPORT 8000 

USER node

# switch to npm if you chose it as package manager
CMD ["yarn", "serve"]

```

A basic docker-compose file for using a docker stack during development:

```
version: "3.3"

services: 
  s1_wb:
    build: 
      context: ./path/to/dockerfile_dir
      dockerfile: Dockerfile.dev
      args:
        - YOUR_APP_WEB_HTTP_PORT=8080
    image: <your_registry>/<your-app_image-name>:<your-app_image-tag>
    ports:
      - "8080:8080"
      - "8000:8000"  # only needed if using vue-cli UI
    volumes:
      - /path/on/host:/path/in/container
    stdin_open: true
    tty: true
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure 
        max_attempts: 5
      resources:
        limits:
          cpus: 4
          memory: 4096M
    environment:
      # https://cli.vuejs.org/guide/mode-and-env.html#modes
      # development is used by vue-cli-service serve
      - NODE_ENV=development
      # one way for hot reloading ... see above for details 
      - CHOKIDAR_USEPOLLING=true
      - CHOKIDAR_INTERVAL=100
      - YOUR_APP_WEB_HTTP_PORT=8080

```

```
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml push
docker stack deploy --compose-file=docker-compose.dev.yml ${COMPOSE_PROJECT_NAME} --with-registry-auth
```