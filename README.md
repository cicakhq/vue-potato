# vue-potato

> A Potato web front-end

## Dependencies

I use the font from https://rsms.me/inter/ by default. This should be manually
installed for now; we could chose to use the webfont eventually.

Tested with Node.js 8x on Ubuntu 17.10, you may want to read:
https://joshtronic.com/2017/10/20/upgrade-to-nodejs-8-on-ubuntu-1710/

I've setup a NGINX proxy to redirect the main pages to the Potato SBCL templates
stuff: the config file for NGINX is `nginx.config`. With that setup, going to
http://localhost:8082 should present the usual Potato login page, and going to
a channel should bring you to the NPM dev server.

Of course, a running Potato is the most obvious dependency. See next.

## Potato test environment

To get started with Potato:
1. Make sure you have `docker` installed
2. Make sure `docker-compose` is installed as well

From there, you want to clone the repo: https://github.com/cicakhq/potato-docker-compose

I am using the dev subtree of `potato-docker-compose` for more flexibility with the Potato server.

``` bash
$ cd potato-docker-compose/dev
$ docker-compose build
$ docker-compose up --build
```

This runs in a set of dockers the dependencies of the Potato server instance.

To run the Potato servers from there, you'll need:
1. To install SBCL on your workstation
2. Setup quicklisp in that SBCL instance (auto-loaded in .sbclrc)
3. Clone the main Potato repo (cicakhq/potato)

``` bash
$ tools/update_submodules
$ tools/build_binary.sh
```

For `build_binary.sh` to succeed, you may want to check that you do have the packages
mentioned in `cicakhq/potato/docs/INSTALL.md`. Once this is done, all is left to do is
to run the Potato server instance.

``` bash
$ ./potato.bin --full
```

and to follow the steps required to create a domain and an initial user account.

Then follow the steps below to run the vue-potato instance, and go to http://localhost:8082
(assuming nginx is setup as discussed above).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8090
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
