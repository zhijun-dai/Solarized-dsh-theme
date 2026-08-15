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
	<a href="README.md">English</a> | 中文
</p>

<p align="center">
	<img src="assets/preview.webp"/>
</p>

## 预览

<details>
<summary>☀️ Solarized 深色</summary>
<img src="assets/solarized-dark.webp"/>
</details>
<details>
<summary>🌞 Solarized 浅色</summary>
<img src="assets/solarized-light.webp"/>
</details>
<details>
<summary>🌗 Selenized 深色</summary>
<img src="assets/selenized-dark.webp"/>
</details>
<details>
<summary>🌕 Selenized 浅色</summary>
<img src="assets/selenized-light.webp"/>
</details>

## 使用

这是 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（dsh）
的双面主题插件。它把四套忠实色板注册进内置主题运行时，在
**设置 → 通用 → Solarized / Selenized 主题** 中作为可选皮肤出现。

[Solarized](https://github.com/altercation/solarized) 是 Ethan Schoonover
于 2011 年设计的精密配色方案：全部十六种颜色都定义在 CIELAB（L\*a\*b\*）
色彩空间中，彼此保持精确固定的感知亮度关系——正是这套科学保证了深色与浅色
模式严格对称。[Selenized](https://github.com/jan-warchol/selenized) 由 Jan
Warchoł 于 2018 年完成，是"重新设计的 Solarized"：修正了原色板的亮度缺陷，
同时保留其精神。

### 安装

从 GitHub 仓库安装：

```sh
dsh plugin --profile web add github:zhijun-dai/Solarized-dsh-theme
```

从本地检出安装（`-w` 标志必需——profile 目录是 pnpm workspace 根目录）：

```sh
dsh plugin --profile web add -w /path/to/Solarized-dsh-theme
```

从 npm 安装：

```sh
dsh plugin --profile web add @yuquexianzhou/solarized-dsh-theme
```

之后重启 web 服务器：

```sh
dsh web
```

### 切换主题

打开 web 界面，进入 **设置 → 通用**，选择四套主题之一（或选 **默认** 跟随
内置外观）。选择按浏览器存储在 `localStorage` 中。

## 工作原理

令牌表由官方 Solarized 与 Selenized 色板生成（从不手改）。
`scripts/gen-client.mjs` 把每个颜色映射到 dsh 的
`@deepseek-ai/dsh-client-ui-theme` 样式表中的 `--dsw-alias-*` 令牌目录
（含 `--shiki-*` 语法色板与泄露的 `--dsw-static-deepseek-*` 静态色），并把
四套主题嵌入浏览器 bundle `lib/client.js`。

```sh
node scripts/gen-client.mjs
```

## 💝 致谢

- [zhijun-dai](https://github.com/zhijun-dai)
- [Ethan Schoonover](https://github.com/altercation) — Solarized
- [Jan Warchoł](https://github.com/jan-warchol) — Selenized
- [KinGao294/dsh-skin](https://github.com/KinGao294/dsh-skin) — 本插件所仿照的参考主题插件
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
