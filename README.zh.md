# Solarized-dsh-theme

[English](README.md) | 中文

DeepSeek Harness（dsh）的忠实 [Solarized](https://github.com/altercation/solarized)
与 [Selenized](https://github.com/jan-warchol/selenized) 主题。它向 DSH 内置的
主题运行时注册四套精选色板，并在 **设置 → 通用**（内置"外观"行下方）添加一个
选择行：

| id               | 模式  | 色板  |
|------------------|--------|----------|
| `solarized-dark` | 深色   | Solarized base03 |
| `solarized-light`| 浅色   | Solarized base3 |
| `selenized-dark` | 深色   | Selenized dark |
| `selenized-light`| 浅色   | Selenized light |

每个令牌都由源色板推导而来——色板家族之外没有任何颜色。Markdown 代码块还会
获得规范的 Solarized / Selenized 语法配色（通过 `--shiki-*` 令牌），让代码保持
其标志性的观感。

选择 **默认** 会恢复内置外观并清除已存储的主题。

## 安装

从 GitHub 仓库安装：

```sh
dsh plugin --profile web add github:zhijun-dai/Solarized-dsh-theme
```

从本地检出安装（`-w` 标志必需——profile 目录是 pnpm workspace 根）：

```sh
dsh plugin --profile web add -w /path/to/Solarized-dsh-theme
```

从 npm 安装：

```sh
dsh plugin --profile web add @yuquexianzhou/solarized-dsh-theme
```

安装后重启 web 服务器：

```sh
dsh web
```

打开 **设置 → 通用** 即可选择主题。

## 开发

客户端 bundle 无需构建步骤；令牌表由源色板生成：

```sh
node scripts/gen-client.mjs   # 重新生成 lib/client.js
```

色板：[Solarized](https://github.com/altercation/solarized)（Ethan
Schoonover，MIT）、[Selenized](https://github.com/jan-warchol/selenized)（Jan
Warchol，MIT）。
