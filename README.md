## Description

A very basic Roku application!

## Prerequisites

This codebase __only supports__ [Visual Studio Code](https://code.visualstudio.com/).

## Installation

1. Install the project's dependencies:

```bash
$ npm install
```

2. Install the [recommended](./.vscode/extensions.json) VSC extensions

3. Create a `.env` with the following in the root of the project:

```
ROKU_IP={YOUR.ROKU.IP}
ROKU_DEV_USER=rokudev
ROKU_DEV_PASSWORD=rokudev
```

## Project Structure

- `/.vscode` - contains the vscode configuration files
- `/manifest` - contains the code for each enviroment's manifest
- `/pipeline` - pipeline code for transpiling Brighterscript and other things
- `/app` - contains the project source code

## Build Process

### Development

The app is deployed using the VSC `debug` launch task. See [debugging in VSC](https://code.visualstudio.com/docs/editor/debugging).

The VSC `debug` launch task does the following:

1. Triggers the `prevsc` package.json, which transpiles any BrighterScript `/src` code
1. The transpiled (`/app` code is copied to `out/transpiled`
1. The app is deployed via the BrightScript Language extenstion

## BrighterScript

Any `.bs` files in the `/app` directory will be transpiled.

