<h3 align="center">
	<img src="https://raw.githubusercontent.com/zhijun-dai/Solarized-dsh-theme/main/assets/solarized-logo.svg" width="100" alt="Logo"/><br/>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
	DeepSeek Harness 的 <a href="https://github.com/deepseek-ai/deepseek-harness">Solarized + Selenized</a> 主题
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
	<a href="README.md">English</a> | 中文
</p>

<p align="center">
	<img src="assets/preview.webp" width="100%" alt="Solarized 与 Selenized 主题下的 DeepSeek Harness"/>
</p>

## 目录

- [简介](#简介)
- [特性](#特性)
- [预览](#预览)
- [安装](#安装)
- [使用](#使用)
- [常见问题](#常见问题)
- [💝 致谢](#-致谢)

## 简介

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
的经典低对比护眼配色主题——一个包同时适配 **Web GUI**（`dsh web`）、
**DSH Desktop** 与 **dsh-TUI** 终端：

- ☀️ **[Solarized](https://ethanschoonover.com/solarized/)** — Ethan
  Schoonover 精心调校的 16 色体系，为长时间阅读设计，不伤眼。
- 🟢 **[Selenized](https://github.com/jan-warchol/selenized)** — 它的改良版：
  同样的低对比理念，更现代的色相与更好的颜色区分度。

两者各有深浅两套，接入官方主题系统，与内置浅色 / 深色 / 跟随系统平级；
代码块遵循经典语法配色，**设置 → 常规** 提供一行 **Solarized / Selenized**
一键切换，选择自动保存、重启自动恢复。

## 特性

- 👁️ **为护眼而生** — Solarized 的色板按亮度精调（不是随手挑色相），
  长时间阅读不疲劳；Selenized 在舒适的基础上提供更干净、更易区分的强调色。
- 🎨 **忠实的色板** — 每个颜色都是 Solarized / Selenized 官方值，
  界面没有默认的 DeepSeek 蓝灰。
- 🖥️ **经典语法配色** — 代码块遵循 Solarized 惯例
  （关键字品红、字符串青色、数字蓝色…）。
- 🖱️ **组件级染色** — 气泡、工具调用行、代码标签、时间戳、hover
  交互都按色板上色。
- 💻 **dsh-TUI 终端主题** — 一条命令装进终端客户端，启动自动同步四套主题。
- 🔄 **更新检查** — 设置页静默检查 npm 新版本（另有手动按钮），
  有新版直接给出可复制的升级命令。
- 🧠 **记住你的选择** — 重启、切模型都不丢；关闭时还原你原本的
  浅色 / 深色偏好，而不是强制"跟随系统"。Desktop 换端口由 `$DSH_HOME`
  下的耐久状态兜底。
- ⚙️ **零侵入** — 切回**默认**逐像素还原，不留任何注入样式。

## 预览

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

## 安装

从 GitHub 安装（推荐——始终最新）：

```sh
dsh plugin --profile web add github:zhijun-dai/Solarized-dsh-theme
```

从 npm 安装：

```sh
dsh plugin --profile web add @yuquexianzhou/solarized-dsh-theme
```

> 💡 npm 版本可能比 GitHub 滞后一点。想要最新版用上面的 GitHub 安装
> （可用 `#分支名` 锁定分支）。

DSH Desktop 用户装到桌面 profile：

```sh
dsh plugin --profile desktop add @yuquexianzhou/solarized-dsh-theme
```

### dsh-TUI 终端主题

同一个包也会把四套主题同步进 dsh-TUI。装进 TUI profile，首次启动即生效：

```sh
dsh plugin --profile dsh-tui add @yuquexianzhou/solarized-dsh-theme
```

在 TUI 里切换：`/theme solarized-dark`。

> 💡 如果你同时用 Web / Desktop 和 dsh-TUI，装到 web profile 也会在每次
> 启动时保持 TUI 主题同步，无需二次安装。磁盘上没有 `~/.dsh-tui`？
> 严格 no-op，不会创建任何东西。

装完重启 web 服务：

```sh
dsh web
```

## 使用

打开 Web UI，进入 **设置 → 常规**，选择四套主题之一（选「默认」恢复内置外观）。
选择按浏览器保存，启动时自动恢复。

## 常见问题

**Q：为什么颜色看起来"发灰"？**

这正是设计意图——Solarized 刻意压低对比度，让文字长时间阅读不疲劳。
想要更鲜明的观感，Selenized 在同样舒适的基础上提供了更强的强调色。

**Q：选择是怎么记住的？**

浏览器 `localStorage`（即时）+ Desktop 场景下 `$DSH_HOME` 的小文件（耐久）——
重启、切模型、Desktop 换端口都不丢。你在内置外观行显式选的浅色 / 深色永远优先。

**Q：怎么升级？**

重跑一次安装命令（会拉到最新版），或者看设置页——它会在有新版本时静默提示，
并给出可直接复制的升级命令。然后重启 `dsh web`。

## 💝 致谢

- [zhijun-dai](https://github.com/zhijun-dai)
- [Ethan Schoonover](https://github.com/altercation) — Solarized
- [Jan Warchoł](https://github.com/jan-warchol) — Selenized
- [KinGao294/dsh-skin](https://github.com/KinGao294/dsh-skin) — 本插件的参考实现
- [DeepSeek](https://github.com/deepseek-ai)

<p align="center">
	🏆 已收录于 <a href="https://github.com/awesome-dsh-plugin/awesome-dsh-plugin">Awesome DSH Plugin</a>
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
