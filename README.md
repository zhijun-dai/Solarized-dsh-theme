<h3 align="center">
	<img src="https://raw.githubusercontent.com/zhijun-dai/Solarized-dsh-theme/main/assets/solarized-logo.svg" width="100" alt="Logo"/><br/>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
	Solarized + Selenized for <a href="https://github.com/deepseek-ai/deepseek-harness">DeepSeek Harness</a>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
</h3>

<p align="center">
	<a href="https://github.com/zhijun-dai/Solarized-dsh-theme/stargazers"><img src="https://img.shields.io/github/stars/zhijun-dai/Solarized-dsh-theme?colorA=002b36&colorB=268bd2&style=for-the-badge"></a>
	<a href="https://github.com/zhijun-dai/Solarized-dsh-theme/issues"><img src="https://img.shields.io/github/issues/zhijun-dai/Solarized-dsh-theme?colorA=002b36&colorB=cb4b16&style=for-the-badge"></a>
	<a href="https://github.com/zhijun-dai/Solarized-dsh-theme/contributors"><img src="https://img.shields.io/github/contributors/zhijun-dai/Solarized-dsh-theme?colorA=002b36&colorB=859900&style=for-the-badge"></a>
	<a href="https://www.npmjs.com/package/@yuquexianzhou/solarized-dsh-theme"><img src="https://img.shields.io/npm/v/@yuquexianzhou/solarized-dsh-theme?colorA=002b36&colorB=2aa198&style=for-the-badge"></a>
</p>

<p align="center">
	English | <a href="README.zh.md">中文</a>
</p>

<p align="center">
	<img src="assets/preview.webp"/>
</p>

## Previews

<details>
<summary>☀️ Solarized Dark</summary>
<img src="assets/solarized-dark.webp"/>
</details>
<details>
<summary>🌞 Solarized Light</summary>
<img src="assets/solarized-light.webp"/>
</details>
<details>
<summary>🌗 Selenized Dark</summary>
<img src="assets/selenized-dark.webp"/>
</details>
<details>
<summary>🌕 Selenized Light</summary>
<img src="assets/selenized-light.webp"/>
</details>

## Usage

This is a dual-face theme plugin for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
(dsh). It registers four faithful palettes into the built-in theme runtime, so
they appear as selectable skins in **Settings → General → Solarized / Selenized
themes**.

[Solarized](https://github.com/altercation/solarized) is a precision color
scheme by Ethan Schoonover (2011), designed in the CIELAB (L\*a\*b\*) color
space with fixed, perceptually uniform lightness relationships between its
sixteen colors — the science that keeps its dark and light modes mutually
symmetric. [Selenized](https://github.com/jan-warchol/selenized), by Jan
Warchoł (2018), is Solarized redesigned: it corrects the palette's lightness
inconsistencies while keeping its spirit.

### Install

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

### Switch themes

Open the web UI, go to **Settings → General**, and pick one of the four themes
(or **Default** to follow the built-in appearance). The choice is stored
per-browser in `localStorage`.

## How it works

The token tables are generated from the official Solarized and Selenized
palettes (never hand-edited). `scripts/gen-client.mjs` maps every color onto
the `--dsw-alias-*` token directory from dsh's
`@deepseek-ai/dsh-client-ui-theme` stylesheets (including the `--shiki-*`
syntax palette and the leaked `--dsw-static-deepseek-*` static colors) and
embeds the four themes into the browser bundle `lib/client.js`.

```sh
node scripts/gen-client.mjs
```

## 💝 Thanks to

- [zhijun-dai](https://github.com/zhijun-dai)
- [Ethan Schoonover](https://github.com/altercation) — Solarized
- [Jan Warchoł](https://github.com/jan-warchol) — Selenized
- [KinGao294/dsh-skin](https://github.com/KinGao294/dsh-skin) — the reference theme plugin this port is modeled on
- [DeepSeek](https://github.com/deepseek-ai)

&nbsp;

<p align="center">
	<img src="https://raw.githubusercontent.com/zhijun-dai/Solarized-dsh-theme/main/assets/solarized-footer.svg" />
</p>

<p align="center">
	Copyright &copy; 2026-present <a href="https://github.com/zhijun-dai" target="_blank">zhijun-dai</a>
</p>

<p align="center">
	<a href="https://github.com/zhijun-dai/Solarized-dsh-theme/blob/main/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=eee8d5&colorA=002b36&colorB=268bd2"/></a>
</p>
