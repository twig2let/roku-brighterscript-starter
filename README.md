<img src="docs/git_banner.png" alt="Roku BrighterScript Starter logo" width="800">


## Description

This template bootstraps a Roku channel built with BrighterScript, providing a ready-to-run app, tooling, and deployment workflow.

## Features

- Node.js-based pipeline to
    - compile and validate BrighterScript code
    - insert the RALE tracker task
- Simple stack-router component for navigating between screens
- BrighterScript class-based implementation of [roku-requests](https://github.com/rokucommunity/roku-requests)
- Basic Roku application that uses the free [TVMAZE](https://www.tvmaze.com/api) public API
    - Splash screen
    - Home screen
    - Details screen
    - Video screen
    - Error screen

## Prerequisites

This codebase __only supports__ [Visual Studio Code](https://code.visualstudio.com/).

## Installation

1. Install the project's dependencies:

```bash
$ npm install
```

2. Install the [recommended](./.vscode/extensions.json) VS Code extensions:

```
"datasert.vscode-texty",
"eamodio.gitlens",
"ibm.output-colorizer",
"mikestead.dotenv",
"redhat.vscode-xml",
"rokucommunity.brightscript",
"shardulm94.trailing-spaces"
```

3. Create a `.env` file in the project root with the following values:

```
ROKU_IP=192.168.0.4
ROKU_DEV_USER=rokudev
ROKU_DEV_PASSWORD=rokudev
```

## Project Structure

- `/.vscode` - contains the VS Code configuration files
- `/pipeline` - pipeline code for transpiling BrighterScript and other things
- `/app` - contains the BrighterScript project source code

## Build Process

### Development

The VS Code `debug` launch task does the following:

1. Triggers the `prevsc` package.json script, which transpiles any BrighterScript code in `/src`
2. Copies the transpiled `/app` code to `out/transpiled`
3. Deploys the app via the VS Code BrightScript language extension

## BrighterScript

Any `.bs` files in the `/app` directory are transpiled.

Check out the BrighterScript documentation [here](https://github.com/rokucommunity/brighterscript).