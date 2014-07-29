Tomat
-----

This repository contains the backend (baasbox) and its interface.

## Requirements

- [Play](http://www.playframework.com)
- [Node.js](http://nodejs.org)
- Optional: Make ([Windows](http://gnuwin32.sourceforge.net/packages/make.htm))

If not done yet install [grunt](http://gruntjs.com) and
[bower](http://bower.io): ```npm install -g grunt-cli bower```.

## Build it

### Dependencies

First you will have to fetch the last version of baasbox:
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
grunt dist
cd ..
```
Copy the interface to baasbox sources:
```sh
cp -r interface/dist/* baasbox/public/interface
cd baasbox
play dist
cd ..
```

## Deploy it

From here should have a _play distribuable archive_, for more information about
deploying it you should take a look at the play
[documentation](http://www.playframework.com/documentation/2.2.x/Production).
  
Taking _mysite.com_ as base url you will have:
- http://mysite.com: Baasbox instance
- http://mysite.com/console: Baasbox administration console
- http://mysite.com/interface/index.html: Tomat admin interface

## Develop it

Tomat is based on a slightly modified version of Baasbox. If you will to
enhance or modify it you should get a look to the
[repo](https://github.com/AhtomeSolution/baasbox).
  
The interface is an angularjs project which root is in ```interface```. If you
want more information about developping with angularjs you should take a look
at the official
[tutoriel](http://campus.codeschool.com/courses/shaping-up-with-angular-js/intro).
Note that executing ```grunt serve``` and begin your modifications should be
enough for small changes.

<!-- vim:set spell spelllang=en: -->
