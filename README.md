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

## Install

From a GitHub repository:

```sh
dsh plugin --profile web add github:zhijun-dai/Solarized-dsh-theme
```

From a local checkout (the `-w` flag is required — the profile directory is a
pnpm workspace root):

```sh
dsh plugin --profile web add -w /path/to/Solarized-dsh-theme
```

From npm:

```sh
dsh plugin --profile web add @yuquexianzhou/solarized-dsh-theme
```

Restart the web server afterwards:

```sh
dsh web
```

Open **Settings → General** to pick a theme.

## Development

The client bundle requires no build step; the token tables are generated from
the source palettes:

```sh
node scripts/gen-client.mjs   # regenerates lib/client.js
```

Palettes: [Solarized](https://github.com/altercation/solarized) (Ethan
Schoonover, MIT), [Selenized](https://github.com/jan-warchol/selenized) (Jan
Warchol, MIT).
