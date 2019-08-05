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
$ yarn run build
$ docker-compose -f ./docker-compose-prod.yaml up --build
```

### dev/stg in host os

``` bash
$ yarn run build
$ yarn start:prod # may fail to set environment variables on windows
```
