# Cubee Frontend Server

## Launch in different environments

### (Recommended) dev/stg in container

``` bash
$ docker-compose up [-d]
```

If you are using docker for windows, and you also want to live reload the app inside container when local file changes, please run the following tool after the container is running. It will inspect all running containers and start notifying containers about changes in mounted directories.

``` bash
$ pip install docker-windows-volume-watcher
$ docker-volume-watcher
```

> This tool is originally found in the post [File system watch does not work with mounted volumes](https://forums.docker.com/t/file-system-watch-does-not-work-with-mounted-volumes/12038/10).
> The author also write a blog post to explain: [Docker for Windows: Watch Bindings](http://blog.subjectify.us/miscellaneous/2017/04/24/docker-for-windows-watch-bindings.html)

### prod in container

``` bash
$ docker-compose -f ./docker-compose-prod.yaml up --build
```

### dev/stg in host os

``` bash
$ CONFIG_PATH="./config-stg.json" yarn start
```

``` bash
$ yarn run build
$ CONFIG_PATH="./config-stg.json" NODE_ENV=production node build/server.js
```

## Encryption/Decryption Sensitive File with Ansible-Vault

``` bash
$ docker run -it --rm -v c:/projects/cubee/cubee-frontend-server/helm-chart/cubee-frontend-server:/ansible gocreating/ansible-vault encrypt ./configMap-prod.yaml
$ docker run -it --rm -v c:/projects/cubee/cubee-frontend-server/helm-chart/cubee-frontend-server:/ansible gocreating/ansible-vault encrypt ./configMap-stg.yaml
$ docker run -it --rm -v c:/projects/cubee/cubee-frontend-server/helm-chart/cubee-frontend-server:/ansible gocreating/ansible-vault decrypt ./configMap-prod.yaml
$ docker run -it --rm -v c:/projects/cubee/cubee-frontend-server/helm-chart/cubee-frontend-server:/ansible gocreating/ansible-vault decrypt ./configMap-stg.yaml
```

## Helper

``` bash
$ docker system prune
```
