# Solarized-dsh-theme

English | [中文](README.zh.md)

Faithful [Solarized](https://github.com/altercation/solarized) and
[Selenized](https://github.com/jan-warchol/selenized) themes for DeepSeek
Harness (dsh). It registers four curated palettes into DSH's built-in theme
runtime and adds a picker row to **Settings → General** (below the built-in
Appearance row):

| id               | scheme | palette  |
|------------------|--------|----------|
| `solarized-dark` | dark   | Solarized base03 |
| `solarized-light`| light  | Solarized base3 |
| `selenized-dark` | dark   | Selenized dark |
| `selenized-light`| light  | Selenized light |

Every token is derived from the source palettes — no colors outside the
family. Markdown code blocks additionally get the canonical Solarized /
Selenized syntax palette (via the `--shiki-*` tokens), so code keeps its
signature look.

Picking **默认 / Default** reverts to the built-in appearance and clears the
stored theme.

## How it works

DSH's theme system is token-based: the web shell ships `--dsw-*` design tokens,
and `ThemeRuntime` lets third-party plugins register themes that override the
alias layer (`--dsw-alias-*`) per color scheme. This package is a regular
dual-face plugin:

- **Host half** (`lib/index.js`) — a `dsh.bundle` patch layer that inserts one
  loader entry (`solarized`); a no-op `apply`, exactly like the shipped ui-*
  packages.
- **Browser half** (`lib/client.js`) — a `dsh.client` bundle (served at
  `/plugins/solarized-dsh-theme/client.js`) that:
  1. registers the four themes via `ctx.theme.register(...)`;
  2. restores the saved theme id and applies it with `ctx.theme.setTheme(...)`;
  3. keeps the picker row store in sync with `theme/change`;
  4. mounts the picker row into `settings.general.item`.

Each theme sets its `colorScheme` (`light`/`dark`), which drives
`body[data-ds-dark-theme]`, plus token overrides applied as inline custom
properties on `<body>` by ui-layout's ThemePresenter. The token key set
mirrors the alias/specific sheets shipped by `@deepseek-ai/dsh-client-ui-theme`,
plus the `--shiki-*` syntax palette from its `shiki.css`.

## Persistence

The choice is stored in `localStorage` (`solarized-dsh-theme:theme`). DSH's Host
settings wire only exposes an allowlisted set of namespaces to browser clients
(`WEB_SETTINGS_NAMESPACES` in `dsh-host-apiproxy`), so a third-party namespace
would answer `settings-not-exposed`; the product itself keeps remote browser
preferences process-local, and localStorage matches that boundary for a visual
preference while surviving reloads on the same origin.

The ThemeService adopts its durable built-in preference from the Host settings
asynchronously after boot, which overwrites a third-party preference restored
too early. The saved theme is therefore re-asserted for a short boot window (a
few `theme/change` events or five seconds), after which the window closes and
subsequent user actions win.

## Install

From anywhere, add the package to the `web` profile:

```sh
dsh plugin --profile web add github:zhijun-dai/Solarized-dsh-theme
```

Or from a local checkout:

```sh
dsh plugin --profile web add -w /path/to/Solarized-dsh-theme
```

> The `-w` flag is required for a local path: every profile ships a
> `pnpm-workspace.yaml`, so pnpm 9 treats the profile directory as a workspace
> root and refuses a bare `add` with `ERR_PNPM_ADDING_TO_ROOT`.

This runs pnpm in `~/.dsh/profiles/web`, installs the package, and appends it
to `dsh.profile.bundles` (its patch layer inserts the `solarized` loader
entry). The running web server must be restarted to pick up the new bundle
layer:

```sh
# stop the running instance, then:
dsh web
```

Open **Settings → General** to pick a theme.

## Publishing (npm)

DSH (rc.6) has **no separate plugin marketplace** — the plugin distribution
channel *is* the npm registry. A package that declares `dsh.bundle` (host
patch layer) and `dsh.client` (browser bundle) is exactly what `dsh plugin
--profile <name> add <package>` installs, so publishing this package to npm is
what "上架" means today:

1. Make sure `files` ships `lib/index.js`, `lib/client.js`, `lib/types`,
   `cordis.patch.yml` (already configured).
2. Publish to the **official npm registry** (a mirror does not reach npmjs):
   ```sh
   npm publish --registry https://registry.npmjs.org
   ```
3. Users install with:
   ```sh
   dsh plugin --profile web add solarized-dsh-theme
   ```
   then restart `dsh web`.

Known platform boundaries to document for users: browser-side preferences are
stored in localStorage (third-party settings namespaces are not exposed over
the wire yet), and the client bundle may only `require` module-table entities
(platform seeds + registered client bundles).

## Development

The client bundle is written directly in the `__ModuleLoader__` bundle format
(the same shape tsdown emits for the shipped `ui-*` packages), so no build step
is required. The token tables are generated from the source palettes:

```sh
node scripts/gen-client.mjs   # regenerates lib/client.js
```

After editing, restart the web server (bundle content is re-hashed and served
with a new `rev`; loader entries are rescanned at boot).

Palettes: [Solarized](https://github.com/altercation/solarized) (Ethan
Schoonover, MIT), [Selenized](https://github.com/jan-warchol/selenized) (Jan
Warchol, MIT).
