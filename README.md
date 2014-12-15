Tomat
=====

This repository contains the back-end (BaasBox), its interface and the mobile application.

## Requirements

- [Play](http://www.playframework.com)  - Please choose 2.2.3 without activator
- [Node.js](http://nodejs.org)
- [Ionic](http://ionicframework.com/getting-started/)
- [git](http://git-scm.com/)
- Optional: Make ([Windows](http://gnuwin32.sourceforge.net/packages/make.htm))

If not done yet install [grunt](http://gruntjs.com) and
[bower](http://bower.io): ```npm install -g grunt-cli bower```.

## Build it

### Dependencies

First you will have to fetch the last version of BaasBox:
```sh
git submodule update --init --recursive
```

### Build with make (the easy way)

If you are on a Unix system (GNU/Linux, Mac OSX) or if you are on Windows and
have installed make all you have to do is:
```sh
make
```
The ```Makefile``` takes care of installing grunt and bower dependencies if
needed.

### Build without make (the hard way)

Build the interface:
```sh
cd interface
npm install
bower install
grunt build
cd ..
```
Copy the interface to BaasBox sources:
```sh
cp -r interface/dist/* baasbox/public/interface
```
And finally build BaasBox:
```sh
cd baasbox
play dist
cd ..
```

## Deploy it

From here should have a _play distribuable archive_, for more information about
deploying it you should take a look at the play
[documentation](http://www.playframework.com/documentation/2.2.x/Production).
  
Taking _site.tld_ as base url you will have:
- http://site.tld: BaasBox instance
- http://site.tld/console: BaasBox administration console
- http://site.tld/interface/index.html: Tomat admin interface

The credentials are:
- username: admin
- password: admin
- app code: 1234567890

## Develop it

Tomat is based on a slightly modified version of BaasBox. If you want to
enhance or modify it you should get a look to the
[repo](https://github.com/AhtomeSolution/baasbox).
The interface is an angularjs project which root is in this
[directory](https://github.com/AthomeSolution/Tomat/tree/master/interface). For
further information about developing with angularjs you should take a look at
the official
[tutorial](http://campus.codeschool.com/courses/shaping-up-with-angular-js/intro).
  
You will need a BaasBox instance to test your interface. If you don't have one
running yet Play can handle this for you:
```sh
cd baasbox
play run
```

By default the interface consider BaasBox to be the server's root. You will
need to change this to your BaasBox instance in
```interface/app/scripts/config.js```. Change the value of ```config.url``` to
```http://localhost:9000``` to use the instance you launched with ```play run```.

To launch the interface (in a new terminal):
```sh
cd interface
grunt serve
```
While using grunt your interface will be accesible at http://localhost:9001.

## Mobile application

Mobile application in mobile directory is based on Ionic. Please make sure you have the last version. 

```sh
cd mobile
npm install
npm grunt
npm bower
bower install
cat plugins.lst | xargs -L1 cordova plugin add
```

To build application for android platform 

```sh
cordova platform add android
ionic build android
ionic emulate android
```

To test the application in your browser 

```sh
grunt build
ionic serve
```

You have to modify mobile/app/scripts/config.js in order to connect to the right server. 

<!-- vim:set spell spelllang=en: -->
