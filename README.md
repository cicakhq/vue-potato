# vue-potato

> A Potato web front-end

## dependencies

I use the font from https://rsms.me/inter/ by default. This should be manually
installed for now; we could chose to use the webfont eventually.

I've setup a NGINX proxy to redirect the main pages to the Potato SBCL templates
stuff: the config file for NGINX is `nginx.config`. With that setup, going to
http://localhost:8082 should present the usual Potato login page, and going to
a channel should bring you to the NPM dev server.

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

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
