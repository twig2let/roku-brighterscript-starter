<img src="docs/git_banner.png" alt="Roku BrighterScript Starter banner" width="800">

A production-ready starter kit for building modern Roku apps using [BrighterScript](https://github.com/rokucommunity/brighterscript), NodeJS tooling, and a modular, scalable architecture.

> 🚀 Build Roku apps the modern way - with TypeScript-like BrighterScript, navigation state, debugging tools, and an opinionated project structure that’s ready for production from day one.

## ✨ Features

| Feature                          | Description                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| ⚡ **BrighterScript Support**     | Modern TypeScript-like language for Roku (classes, interfaces, constants, enums, namespaces, null-Coalescing Operator, transpiled to BrightScript) |
| 🛠 **Node Build Pipeline**       | Transpilation, validation, packaging, and deployment directly to a Roku device                    |
| 🧭 **Stack-Based Router**        | Navigate between screens with full state and history management                                   |
| 🌐 **HTTP Helper**               | Built-in class for clean, reusable API calls                                                      |
| 🧩 **Modular Project Structure** | Screens and components separated for maintainability and scale                                    |
| 🧪 **RALE Debug Integration**    | Automatically bundles Roku’s [debug extension](https://developer.roku.com/en-gb/docs/developer-program/dev-tools/rale-tutorial.md) for advanced inspection       |
| ✅ **Production Ready**          | Designed to be extended, white-labeled, or used as a foundation for commercial apps              |

## 🚀 Quickstart

```sh
# 1. Clone this repo (Or click the 'Use this template' button)
git clone git@github.com:twig2let/roku-brighterscript-starter.git
cd roku-brighterscript-starter

# 2. Install dependencies
npm install

# 3. Create a `.env` in the root of the project.
ROKU_IP=YOUR-ROKU-DEVICE-IP-ADDRESS
ROKU_DEV_USER=rokudev
ROKU_DEV_PASSWORD=rokudev

# 4. (Optional) Build & deploy to your Roku device…
npm run roku-deploy
```

👉 See the [VSCode Brightscript Extension](#-vscode-brightscript-extension) section for a (better) alternative deployment method


## 📝 VSCode Brightscript Extension

Supported out-the-box! This [Roku community extension](https://rokucommunity.github.io/vscode-brightscript-language/index.html) is jam-packed with features, including:

- Full debugger support including breakpoints, variable inspection, and more
- Integrated telnet logs and interactive console
- Client-side syntax checking powered by the BrighterScript language server
- Syntax highlighting, code formatting, symbol navigation, and much more

Just run the __Debug__ launch task in the VSCode IDE.

## 📁 Project Structure

```sh
├─ .vscode/ #
├─ app/
│ ├─ components/ # UI fragments: common widgets, screen presenters, SDK-specific pieces
│ │ ├─ common/ # Shared components reused across screens
│ │ ├─ itemComponents/ # UI bits for item tiles, rows, etc.
│ │ ├─ screens/ # Screen-level component implementations
│ │ └─ sdk/ # Framework-grade UI/tasks (buttons, router, HTTP task) reusable across apps
│ ├─ fonts/ # Typefaces bundled with the channel
│ ├─ images/ # Channel art (icons, splash, dimmers, view assets)
│ └─ source/ # BrighterScript source code (For code without an associated XML file)
│   ├─ facades/ # Facade classes abstracting framework APIs
│   ├─ libs/ # Shared libraries/helpers
│   ├─ parsers/ # Data parsing/normalisation logic
│   └─ sdk/ # Framework-grade non UI related code
├─ pipeline/ # Build/deployment pipeline scripts
└- bsconfig.json # BrighterScript config
```

✅ Opinionated structure for clarity

✅ Designed for commercial-scale apps

✅ Easy to extend with additional modules

## 🧭 Routing & Navigation

This starter includes a stack-based router, enabling:

- Push/pop navigation
- Screen parameters
- Back navigation history
- State persistence

Example usage:

```brs
App.Navigation.Router.NavigateTo(App.Constants.RouteDefintions.HOME, { data: viewData })
```

## 🌐 HTTP Helper Example

```brs
App.Helpers.HTTP.makeRequest("GET", "https://api.tvmaze.com/shows", invalid, sub(response as Object)
    if NOT response.ok
        App.Navigation.Router.NavigateTo(App.Constants.RouteDefintions.ERROR)
        return
    end if

    _buildView(response.json)
end sub)
```

## 🧠 Why BrighterScript?

[BrighterScript](https://github.com/rokucommunity/brighterscript) is a modern superset of BrightScript that includes:

- Compile-time validation to reduce runtime crashes
- Classes and inheritance
- Namespaces
- Ternary operator
- Null-coalescing operator
- Works with standard BrightScript (.brs) files
- It's actively maintained with a strong [community](https://join.slack.com/t/rokudevelopers/shared_invite/zt-3g37gh6qe-ZOewGYW74uDCtywWCOz7yA) behind it!


## 🤝 Contributing

Contributions are welcome! Feel free to open issues, submit PRs, or suggest features.


## 📄 License

MIT License — free to use, extend, and commercialise.
