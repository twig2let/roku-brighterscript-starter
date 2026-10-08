# Agent guidance

Roku SceneGraph channel written in BrighterScript. Channel source is `app/` (`bsconfig.json` `rootDir`). `scripts/` and `pipeline/` compile and package it. Use this file for code changes; the README covers the product overview and release process.

## Structure and boundaries

- `app/source/` is logic without component XML. `app/components/` is SceneGraph UI: `Name.xml` plus `Name.bs`, and a `*Style.bs` when a screen needs one.
- `app/components/sdk/` and `app/source/sdk/` are the reusable framework. Channel screens, modals, parsers, and theme stay outside that tree.
- Host tooling never runs on the device.
- `SDK::Router` creates screens from the route `component` name. `AppScene` creates `ExitConfirmationModal` itself.
- Cross-screen navigation goes through `SDK.Navigation.Router` after `setGlobalRouter`. App-wide signals go through `SDK.EventBus`. `main.bs` observes `exitApp` to leave the message loop.
- `m.global.theme` is set once in `AppScene` from `App.Theme`.

## BrightScript and SceneGraph

Match `.vscode/settings.json`: 4-space indent, format on save, types in title case (`String`, `Object`, `Boolean`), `invalid` lower case, keywords lower case, and `NOT` / `OR` / `AND` upper case.

- Import with `pkg:/...` paths. Point each component script URI at its sibling `.bs` file.
- The XML `component name` matches the file name. Screens extend `BaseScreen`.
- `init()` caches children with `findNode`, applies style, and subscribes with `observeFieldScoped`. Handlers are subs in that component.
- Private subs and functions start with `_`. Keep the existing section banners. Mark overrides with `@override`.
- Put shared non-UI logic in an `App` or `SDK` namespace. Namespace functions run in the caller's `m` scope.
- `observeFieldScoped` resolves a function name, not a dotted namespace path. Use the transpiled underscore name, or a top-level sub, as `RequestHelper.bs` and `EventBus.bs` do.
- Layout is FHD (1920×1080).

## Names, types, validation, errors, defaults

- Route ids live in `App.Constants.RouteDefintions` (that spelling): `component`, `name`, `addToHistory`, `canGoBack`. App event names live in `App.Constants.Events`.
- Annotate parameters. Use `invalid` for absence, and `??` / `?.` for fallbacks.
- Validate external and persisted data before use, following existing type-checking patterns. Handle malformed values and boundary cases with sensible defaults.
- Guard early and return. HTTP callbacks use `response.json` only when `response.ok`; otherwise navigate to the error route. There is no BrightScript try/catch in this channel.
- `ObjectUtils.deepClone` copies assocarrays and arrays. SceneGraph nodes stay by reference, and cycles are not detected. Keep route params and `routeState` as plain data.

## Lifecycle, async work, and focus

`BaseScreen` observes `params` and `willDestroy`. The router sets them after `createChild`, so `init()` runs before `onParamsChanged`. On leave it sets `willDestroy`, then removes the child. Stop timers and animations there.

Do not call `roUrlTransfer` on the render thread. Use `App.Helpers.HTTP.makeRequest`, which runs `HttpRequestTask`. Copy a stored callback to a local before calling it so it keeps the caller's `m`.

`onKeyEvent` returns false on key-up. Return true only when the component consumes the key. `AppScene` handles `back` with `Router.goBack()` and opens the exit modal when that returns false. The modal emits `EXIT_APP` or `CLOSE_EXIT_CONFIRMATION`.

Screens implement `setFocus(focused as Boolean) as Boolean` and focus the control that should receive keys. `SDK::Router.setFocus` always focuses the current screen; it does not apply a `false` argument.

`navigateTo` accepts an optional `routeState`. The router returns it later as `params.backState` and sets `params.isBackJourney`. `goBack(params)` deep-merges those params over the saved state.

## Reuse these

- Navigation: `SDK.Navigation.Router.navigateTo`, `goBack`, `setFocus`.
- Events: `SDK.EventBus.on`, `off`, `emit`, `clear`. Payloads are deep-cloned plain data. With context, the handler takes `(payload, context)`.
- HTTP: `App.Helpers.HTTP.makeRequest`.
- Data: `ObjectUtils.deepClone`, `deepMerge`, `shallowEqual`; `ArrayUtils.filterArray`; `ViewUtils.stripHtmlTags`, `createExtrasString`, and `applyStyle`.
- Styling: call `applyStyle` in `init()` with a `build()` assocarray keyed by child id. A `top` key applies to the component. Constants can be applied with `setFields` instead.
- Widgets: `AppLabel`, `AppButton`, `FocusLayoutGroup`, `FadePoster`. `AppLabel` `fontStyle` matches `App.Theme.FONTS` keys.

## Build and checks

No unit-test or device-test script exists. The transpile is the automated check, and it fails on BrighterScript errors.

No device required:

- `npm run build` is the debug pipeline unless `ENV=prod`.
- `npm run build:debug` and `npm run debug` are debug builds. `npm run debug` does not deploy.
- `npm run build:prod` is the production transpile and minify.
- `npm run release` zips an existing build. It does not compile.

Device required (`.env` `ROKU_IP` and `ROKU_DEV_PASSWORD`):

- `npm run roku-deploy` builds the debug package and publishes it.
- The VS Code Debug launch config sideloads that package.
