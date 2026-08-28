#!/usr/bin/env node
/**
 * Generate themes/tui/*.json — Solarized/Selenized themes for dsh-TUI
 * (dropped into ~/.dsh-tui/themes/, see dsh-TUI docs/themes.md).
 *
 * Palettes are the canonical Solarized (Ethan Schoonover, MIT) and
 * Selenized (Jan Warchol, MIT) 16-colour sets — the same sources the web
 * half's gen-client.mjs builds on. The 95-key dsh-TUI colour plan follows
 * the classic Solarized syntax conventions: keyword = magenta, string =
 * cyan, comment = base01, number/function = blue, type = yellow, variable
 * = text, operator = cyan, punctuation = base01, constant = orange;
 * semantic keys: success = green, error = red, warning = yellow, merged =
 * accent (blue — the web brand); brand/interaction group = blue; diff
 * backgrounds at 15% alpha (word 20%); shimmer variants blend the base
 * colour 30% towards text; rainbow slots hue-match the seven dsh-TUI slots
 * (indigo = violet, violet = magenta).
 *
 * Run: node scripts/gen-tui-themes.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(root, 'themes', 'tui')

/** All keys of the dsh-TUI Theme type, in declaration order — the loader
 *  skips unknown keys, so this doubles as a guard against typos. */
const THEME_KEYS = [
  'autoAccept', 'bashBorder', 'claude', 'toolNameMutate', 'toolNameExec',
  'claudeShimmer', 'claudeBlue_FOR_SYSTEM_SPINNER', 'claudeBlueShimmer_FOR_SYSTEM_SPINNER',
  'permission', 'permissionShimmer', 'planMode', 'ide', 'promptBorder', 'promptBorderShimmer',
  'text', 'inverseText', 'inactive', 'inactiveShimmer', 'subtle', 'suggestion', 'remember',
  'background', 'success', 'error', 'warning', 'merged', 'warningShimmer',
  'diffAdded', 'diffRemoved', 'diffAddedDimmed', 'diffRemovedDimmed', 'diffAddedWord', 'diffRemovedWord',
  'toolCardBackground', 'toolCardBackgroundDim',
  'toolDotExec', 'toolDotRead', 'toolDotWrite', 'toolDotWeb', 'toolDotTask',
  'syntaxKeyword', 'syntaxString', 'syntaxComment', 'syntaxNumber', 'syntaxFunction',
  'syntaxType', 'syntaxVariable', 'syntaxOperator', 'syntaxPunctuation', 'syntaxConstant',
  'red_FOR_SUBAGENTS_ONLY', 'blue_FOR_SUBAGENTS_ONLY', 'green_FOR_SUBAGENTS_ONLY',
  'yellow_FOR_SUBAGENTS_ONLY', 'purple_FOR_SUBAGENTS_ONLY', 'orange_FOR_SUBAGENTS_ONLY',
  'pink_FOR_SUBAGENTS_ONLY', 'cyan_FOR_SUBAGENTS_ONLY',
  'professionalBlue', 'chromeYellow', 'clawd_body', 'clawd_background',
  'userMessageBackground', 'userMessageBackgroundHover', 'messageActionsBackground',
  'selectionBg', 'bashMessageBackgroundColor', 'memoryBackgroundColor',
  'rate_limit_fill', 'rate_limit_empty', 'fastMode', 'fastModeShimmer',
  'briefLabelYou', 'briefLabelClaude',
  'rainbow_red', 'rainbow_orange', 'rainbow_yellow', 'rainbow_green', 'rainbow_blue',
  'rainbow_indigo', 'rainbow_violet',
  'rainbow_red_shimmer', 'rainbow_orange_shimmer', 'rainbow_yellow_shimmer',
  'rainbow_green_shimmer', 'rainbow_blue_shimmer', 'rainbow_indigo_shimmer', 'rainbow_violet_shimmer',
  'subagentBullet', 'subagentDescription', 'subagentModel', 'subagentElapsed',
  'subagentToolName', 'subagentStatusRunning', 'subagentStatusCompleted', 'subagentStatusFailed',
]

/* ---------------- colour helpers (all palette-canonical) ---------------- */

const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const toHex = (rgb) => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`

/** Blend colour `a` towards colour `b` by ratio t (0..1); shimmer variants. */
function blend(p, a, b, t) {
  const [ar, ag, ab] = channels(p[a])
  const [br, bg, bb] = channels(p[b])
  return toHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t])
}

/** Palette colour + alpha byte (diff bgs 15%/20%, selection 25–30%). */
function alpha(p, name, ratio) {
  return p[name] + Math.round(ratio * 255).toString(16).padStart(2, '0')
}

/* ----------------------- normalized palette builders ----------------------- */

const hex = (rgb) => Object.fromEntries(Object.entries(rgb).map(([k, v]) => [k, toHex(v)]))

const SOLARIZED_RGB = {
  base03: [0, 43, 54], base02: [7, 54, 66], base01: [88, 110, 117],
  base00: [101, 123, 131], base0: [131, 148, 150], base1: [147, 161, 161],
  base2: [238, 232, 213], base3: [253, 246, 227],
  yellow: [181, 137, 0], orange: [203, 75, 22], red: [220, 50, 47],
  magenta: [211, 54, 130], violet: [108, 113, 196], blue: [38, 139, 210],
  cyan: [42, 161, 152], green: [133, 153, 0],
}

const SEL_D_RGB = {
  base03: [16, 60, 72], base02: [24, 73, 86], base01: [45, 91, 105],
  base00: [114, 137, 143], base0: [173, 188, 188], base1: [202, 216, 217],
  base2: [236, 227, 204], base3: [251, 243, 219],
  yellow: [219, 179, 45], orange: [237, 134, 73], red: [250, 87, 80],
  magenta: [242, 117, 190], violet: [175, 136, 235], blue: [70, 149, 247],
  cyan: [65, 199, 185], green: [117, 185, 56],
}

const SEL_L_RGB = {
  base03: [251, 243, 219], base02: [236, 227, 204], base01: [213, 205, 182],
  base00: [144, 153, 149], base0: [83, 103, 109], base1: [58, 77, 83],
  base2: [236, 227, 204], base3: [251, 243, 219],
  yellow: [173, 137, 0], orange: [194, 93, 30], red: [210, 33, 45],
  magenta: [202, 72, 152], violet: [135, 98, 198], blue: [0, 114, 212],
  cyan: [0, 156, 143], green: [72, 145, 0],
}

/** Semantic-key palettes per flavor (each theme picks its own text/sub/dim
 *  roles — Solarized light reads base00 as its ink, Selenized light reads
 *  fg0; the surface ramp differs per base too). */
const PALETTES = {
  'solarized-dark': {
    ...hex(SOLARIZED_RGB),
    base: '#002b36', text: '#93a1a1', sub: '#839496', dim: '#586e75',
    surface0: '#073642', surface1: '#073642', surface2: '#586e75',
  },
  'solarized-light': {
    ...hex(SOLARIZED_RGB),
    base: '#fdf6e3', text: '#657b83', sub: '#839496', dim: '#93a1a1',
    surface0: '#eee8d5', surface1: '#eee8d5', surface2: '#93a1a1',
  },
  'selenized-dark': {
    ...hex(SEL_D_RGB),
    base: '#103c48', text: '#adbcc0', sub: '#cad8d9', dim: '#728f98',
    surface0: '#18384a', surface1: '#18384a', surface2: '#2d5b69',
  },
  'selenized-light': {
    ...hex(SEL_L_RGB),
    base: '#fbf3db', text: '#53676d', sub: '#909995', dim: '#3a4d53',
    surface0: '#ece3cc', surface1: '#ece3cc', surface2: '#d5cdb6',
  },
}

/* ------------------------------ colour plan ------------------------------ */

function buildColors(p, light) {
  const shimmer = (name) => blend(p, name, 'text', 0.3)
  const accent = 'blue' // matches the web half's brand

  return {
    autoAccept: p[accent],
    bashBorder: p.magenta,
    claude: p[accent],
    toolNameMutate: p.yellow,
    toolNameExec: p.cyan,
    claudeShimmer: shimmer(accent),
    claudeBlue_FOR_SYSTEM_SPINNER: p[accent],
    claudeBlueShimmer_FOR_SYSTEM_SPINNER: shimmer(accent),
    permission: p[accent],
    permissionShimmer: shimmer(accent),
    planMode: p.green,
    ide: p[accent],
    promptBorder: p.surface2,
    promptBorderShimmer: p[accent],
    text: p.text,
    inverseText: p.base,
    inactive: p.sub,
    inactiveShimmer: p.text,
    subtle: p.dim,
    suggestion: p[accent],
    remember: p[accent],
    background: p[accent],
    success: p.green,
    error: p.red,
    warning: p.yellow,
    merged: p[accent],
    warningShimmer: shimmer('yellow'),
    diffAdded: alpha(p, 'green', 0.15),
    diffRemoved: alpha(p, 'red', 0.15),
    diffAddedDimmed: alpha(p, 'green', 0.08),
    diffRemovedDimmed: alpha(p, 'red', 0.08),
    diffAddedWord: alpha(p, 'green', 0.2),
    diffRemovedWord: alpha(p, 'red', 0.2),
    toolCardBackground: p.surface0,
    toolCardBackgroundDim: p.dim,
    toolDotExec: p.green,
    toolDotRead: p.cyan,
    toolDotWrite: p[accent],
    // stays blue so the five tool dots remain distinguishable
    toolDotWeb: p.blue,
    toolDotTask: p.magenta,
    syntaxKeyword: p.magenta,
    syntaxString: p.cyan,
    syntaxComment: p.dim,
    syntaxNumber: p.blue,
    syntaxFunction: p.blue,
    syntaxType: p.yellow,
    syntaxVariable: p.text,
    syntaxOperator: p.cyan,
    syntaxPunctuation: p.dim,
    syntaxConstant: p.orange,
    red_FOR_SUBAGENTS_ONLY: p.red,
    blue_FOR_SUBAGENTS_ONLY: p.blue,
    green_FOR_SUBAGENTS_ONLY: p.green,
    yellow_FOR_SUBAGENTS_ONLY: p.yellow,
    purple_FOR_SUBAGENTS_ONLY: p.violet,
    orange_FOR_SUBAGENTS_ONLY: p.orange,
    pink_FOR_SUBAGENTS_ONLY: p.magenta,
    cyan_FOR_SUBAGENTS_ONLY: p.cyan,
    professionalBlue: p[accent],
    chromeYellow: p.yellow,
    clawd_body: p.orange,
    clawd_background: p.base,
    // userMessageBackground omitted: built-in bases define '' (no fill)
    userMessageBackgroundHover: alpha(p, 'surface0', 0.5),
    messageActionsBackground: p.surface0,
    selectionBg: alpha(p, 'blue', light ? 0.3 : 0.25),
    bashMessageBackgroundColor: alpha(p, 'surface0', 0.6),
    memoryBackgroundColor: alpha(p, 'surface0', 0.6),
    rate_limit_fill: p[accent],
    rate_limit_empty: p.surface1,
    fastMode: p.orange,
    fastModeShimmer: shimmer('orange'),
    briefLabelYou: p.yellow,
    briefLabelClaude: p[accent],
    rainbow_red: p.red,
    rainbow_orange: p.orange,
    rainbow_yellow: p.yellow,
    rainbow_green: p.green,
    rainbow_blue: p.blue,
    rainbow_indigo: p.violet,
    rainbow_violet: p.magenta,
    rainbow_red_shimmer: shimmer('red'),
    rainbow_orange_shimmer: shimmer('orange'),
    rainbow_yellow_shimmer: shimmer('yellow'),
    rainbow_green_shimmer: shimmer('green'),
    rainbow_blue_shimmer: shimmer('blue'),
    rainbow_indigo_shimmer: shimmer('violet'),
    rainbow_violet_shimmer: shimmer('magenta'),
    subagentBullet: p.magenta,
    subagentDescription: p.text,
    subagentModel: p.sub,
    subagentElapsed: p.sub,
    subagentToolName: p[accent],
    subagentStatusRunning: p[accent],
    subagentStatusCompleted: p.green,
    subagentStatusFailed: p.red,
  }
}

/* --------------------------------- emit ---------------------------------- */

const THEMES = [
  { id: 'solarized-dark', label: 'Solarized Dark', base: 'dark' },
  { id: 'solarized-light', label: 'Solarized Light', base: 'light' },
  { id: 'selenized-dark', label: 'Selenized Dark', base: 'dark' },
  { id: 'selenized-light', label: 'Selenized Light', base: 'light' },
]

const HEX_VALUE = /^(?:#[0-9a-f]{6}(?:[0-9a-f]{2})?|)$/

mkdirSync(OUT_DIR, { recursive: true })
for (const { id, label, base } of THEMES) {
  const colors = buildColors(PALETTES[id], base === 'light')

  // Guard: keys exactly the dsh-TUI Theme set minus deliberately omitted
  // keys, values well-formed (the TUI loader skips bad entries per key).
  const omitted = new Set(['userMessageBackground'])
  delete colors.userMessageBackground
  const keys = Object.keys(colors)
  const expected = THEME_KEYS.filter((k) => !omitted.has(k))
  if (keys.join(',') !== expected.join(',')) {
    const missing = expected.filter((k) => !keys.includes(k))
    const extra = keys.filter((k) => !expected.includes(k))
    throw new Error(`${id}: key mismatch — missing: ${missing}, extra: ${extra}`)
  }
  for (const [key, value] of Object.entries(colors)) {
    if (!HEX_VALUE.test(value)) throw new Error(`${id}: bad value for ${key}: ${value}`)
  }

  const file = join(OUT_DIR, `${id}.json`)
  writeFileSync(
    file,
    `${JSON.stringify(
      { name: id, displayName: label, base, colors },
      null,
      2,
    )}\n`,
    'utf8',
  )
  console.log(`wrote ${file} (${keys.length} keys)`)
}
