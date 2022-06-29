This application allow you to create a youTube playlist !

[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# youTube_playlist

This application allow you to create a youTube playlist !

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/razKap/youTube_playlist.git
$ cd youTube_playlist
```

To install and set up the library, run:

```sh
$ npm install
```

## Usage

### Serving the app ( including the server )

```sh
$ npm run dev
```

### Running the tests

```sh
$ npm run tests
```

### Building a distribution version

```sh
$ npm run build
```

This task will create a distribution version of the project
inside your local `dist/` folder

## API

### useBasicFetch

```js
useBasicFetch((url: string = ""), (delay: number = 0));
```

Supported options and result fields for the `useBasicFetch` hook are listed below.

## Authors

- **Raz Kapuya** - _Initial work_
