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

## 工作原理

DSH 的主题系统基于令牌：web 壳内置 `--dsw-*` 设计令牌，`ThemeRuntime` 允许
第三方插件按配色方案注册覆盖别名层（`--dsw-alias-*`）的主题。本包是一个常规的
双面插件：

- **Host 半区**（`lib/index.js`）——一个 `dsh.bundle` 补丁层，插入一条 loader
  条目（`solarized`）；`apply` 为空操作，与随附的 ui-* 包完全一致。
- **浏览器半区**（`lib/client.js`）——一个 `dsh.client` bundle（由
  `/plugins/@yuquexianzhou/solarized-dsh-theme/client.js` 提供），负责：
  1. 通过 `ctx.theme.register(...)` 注册四套主题；
  2. 恢复已保存的主题 id 并用 `ctx.theme.setTheme(...)` 应用；
  3. 让选择行的 store 与 `theme/change` 保持同步；
  4. 把选择行挂载到 `settings.general.item`。

每套主题都声明其 `colorScheme`（`light`/`dark`），驱动
`body[data-ds-dark-theme]`，另附由 ui-layout 的 ThemePresenter 以
`<body>` 内联自定义属性的形式应用的令牌覆盖。令牌键集与
`@deepseek-ai/dsh-client-ui-theme` 随附的 alias/specific 表一致，另加其
`shiki.css` 中的 `--shiki-*` 语法色板。

## 持久化

选择存储在 `localStorage`（`solarized-dsh-theme:theme`）。DSH 的 Host settings
通道只向浏览器客户端开放一份允许列表内的命名空间（`dsh-host-apiproxy` 的
`WEB_SETTINGS_NAMESPACES`），第三方命名空间会收到 `settings-not-exposed`；
产品本身将远程浏览器的偏好保留在进程内，而 localStorage 与此边界一致——视觉
偏好在同源内可跨刷新存活。

ThemeService 会在启动后异步从 Host settings 采纳其持久化的内置偏好，这会把
恢复得过早的第三方偏好覆盖掉。因此已保存的主题会在一个短暂的启动窗口内
（几次 `theme/change` 事件或五秒）被重新断言，窗口关闭后后续用户操作优先。

## 安装

在任意位置把包添加到 `web` profile：

```sh
dsh plugin --profile web add github:zhijun-dai/Solarized-dsh-theme
```

或从本地检出安装：

```sh
dsh plugin --profile web add -w /path/to/Solarized-dsh-theme
```

> 本地路径必须带 `-w` 标志：每个 profile 都自带 `pnpm-workspace.yaml`，pnpm 9
> 会把 profile 目录视为 workspace 根目录，不带 `-w` 的裸 `add` 会报
> `ERR_PNPM_ADDING_TO_ROOT`。

该命令在 `~/.dsh/profiles/web` 内运行 pnpm，安装包并将其追加到
`dsh.profile.bundles`（其补丁层插入 `solarized` loader 条目）。必须重启 web
服务器才能加载新的 bundle 层：

```sh
# 停止正在运行的实例，然后：
dsh web
```

打开 **设置 → 通用** 即可选择主题。

## 发布（npm）

DSH（rc.6）**没有单独的插件市场**——插件分发渠道就是 npm registry。声明了
`dsh.bundle`（host 补丁层）和 `dsh.client`（浏览器 bundle）的包正是
`dsh plugin --profile <name> add <package>` 安装的对象，所以把本包发布到
npm 就是今天的"上架"：

1. 确认 `files` 包含 `lib/index.js`、`lib/client.js`、`lib/types`、
   `cordis.patch.yml`（已配置好）。
2. 发布到 **npm 官方 registry**（镜像不会到达 npmjs）：
   ```sh
   npm publish --registry https://registry.npmjs.org
   ```
3. 用户安装：
   ```sh
   dsh plugin --profile web add @yuquexianzhou/solarized-dsh-theme
   ```
   然后重启 `dsh web`。

需要向用户说明的已知平台边界：浏览器侧偏好存储在 localStorage（第三方
settings 命名空间尚未通过线路暴露），且客户端 bundle 只能 `require` 模块表
中的实体（平台种子 + 已注册的客户端 bundle）。

## 开发

客户端 bundle 直接以 `__ModuleLoader__` bundle 格式编写（与 tsdown 为随附
`ui-*` 包产出的格式相同），因此不需要构建步骤。令牌表由源色板生成：

```sh
node scripts/gen-client.mjs   # 重新生成 lib/client.js
```

编辑后重启 web 服务器（bundle 内容会重新哈希并以新的 `rev` 提供；loader 条目
在启动时重新扫描）。

色板：[Solarized](https://github.com/altercation/solarized)（Ethan
Schoonover，MIT）、[Selenized](https://github.com/jan-warchol/selenized)（Jan
Warchol，MIT）。
