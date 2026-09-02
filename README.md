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
	<a href="https://www.npmjs.com/package/@yuquexianzhou/solarized-dsh-theme"><img src="https://img.shields.io/npm/dt/@yuquexianzhou/solarized-dsh-theme?colorA=002b36&colorB=859900&style=for-the-badge"></a>
</p>

<p align="center">
	<a href="README.zh.md">中文</a>
</p>

<p align="center">
	<img src="assets/preview.webp" width="100%" alt="Solarized and Selenized themes in DeepSeek Harness"/>
</p>

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Previews](#previews)
- [Install](#install)
- [Usage](#usage)
- [FAQ](#faq)
- [💝 Thanks to](#-thanks-to)

## Intro

The classic low-contrast, eye-friendly palettes for
[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) — one
package covering **Web GUI** (`dsh web`), **DSH Desktop** and **dsh-TUI**:

- ☀️ **[Solarized](https://ethanschoonover.com/solarized/)** — Ethan
  Schoonover's carefully tuned 16-color system, designed for long reading
  sessions without eye strain.
- 🟢 **[Selenized](https://github.com/jan-warchol/selenized)** — its
  refined take: the same low-contrast philosophy with modernized hues and
  better color distinction.

Both come in dark and light, registered into the built-in theme system on a
level with the light/dark/system choices — with canonical syntax colors for
code blocks and a one-click switch row in **Settings → General** that
remembers your choice.

## Features

- 👁️ **Eye-friendly by design** — Solarized's palette is luminance-tuned,
  not hue-picked, so text stays readable for hours; Selenized keeps the
  comfort with cleaner, more distinct accents.
- 🎨 **Faithful palettes** — every color is a canonical Solarized /
  Selenized value; no default DeepSeek blue-gray leaks through.
- 🖥️ **Canonical syntax colors** — code blocks follow the classic Solarized
  syntax mapping (keyword magenta, string cyan, number blue…).
- 🖱️ **Component-level accents** — bubbles, tool-call rows, code tags,
  timestamps and hover interactions tinted from the palettes.
- 💻 **dsh-TUI themes** — one install command drops the four themes into
  your terminal client; auto-synced on every start.
- 🔄 **Update check** — Settings silently checks npm for a newer release
  (manual button too) and shows a copyable upgrade command.
- 🧠 **Choice remembered** — survives restarts and model switches; turning
  it off restores the light/dark choice you had before, not a forced
  "system". Desktop port churn is covered by durable state under
  `$DSH_HOME`.
- ⚙️ **Zero intrusion** — switching to **Default** restores the built-in
  appearance pixel-identical.

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
<summary>🟢 Selenized Dark</summary>
<img src="assets/selenized-dark.webp"/>
</details>
<details>
<summary>🌿 Selenized Light</summary>
<img src="assets/selenized-light.webp"/>
</details>

## Install

From GitHub (recommended — always the latest):

```sh
dsh plugin --profile web add github:zhijun-dai/Solarized-dsh-theme
```

From npm:

```sh
dsh plugin --profile web add @yuquexianzhou/solarized-dsh-theme
```

> 💡 The npm release may lag slightly behind GitHub. For the very latest,
> use the GitHub install above (pin a branch with `#branch-name`).

For DSH Desktop, target the desktop profile:

```sh
dsh plugin --profile desktop add @yuquexianzhou/solarized-dsh-theme
```

### dsh-TUI (terminal themes)

The same package syncs the four themes into your dsh-TUI. Install into the
TUI profile and they land on the first start:

```sh
dsh plugin --profile dsh-tui add @yuquexianzhou/solarized-dsh-theme
```

Then pick a theme inside the TUI: `/theme solarized-dark`.

> 💡 Installed into a web/desktop profile of a user who also runs dsh-TUI,
> the themes stay in sync on every web start. No `~/.dsh-tui` on disk?
> Strict no-op, nothing is created.

Restart the web server afterwards:

```sh
dsh web
```

## Usage

Open the web UI, go to **Settings → General**, and pick one of the four
themes (or **Default** to follow the built-in appearance). Choice is saved
per browser and restored at boot.

## FAQ

**Q: Why do the colors look "washed out"?**

That's the point — Solarized deliberately keeps contrast low so text stays
readable for hours without eye strain. If you want more punch, Selenized
offers the same comfort with stronger accents.

**Q: How is my choice remembered?**

Browser `localStorage` (instant) plus a durable file under `$DSH_HOME` for
Desktop — survives restarts, model switches and per-launch port changes.
Your explicit light/dark/system pick in the built-in Appearance row always
wins.

**Q: How do I upgrade?**

Re-run the install command, or check the Settings row — it silently tells
you when a newer version exists and shows the copyable upgrade command.
Then restart `dsh web`.

## 💝 Thanks to

- [zhijun-dai](https://github.com/zhijun-dai)
- [Ethan Schoonover](https://github.com/altercation) — Solarized
- [Jan Warchoł](https://github.com/jan-warchol) — Selenized
- [KinGao294/dsh-skin](https://github.com/KinGao294/dsh-skin) — the reference theme plugin this port is modeled on
- [DeepSeek](https://github.com/deepseek-ai)

<p align="center">
	🏆 Listed on <a href="https://github.com/awesome-dsh-plugin/awesome-dsh-plugin">Awesome DSH Plugin</a>
</p>

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
