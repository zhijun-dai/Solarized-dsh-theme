// One-shot generator for lib/client.js: builds the four Solarized/Selenized
// token tables from the source palettes and embeds them into the client
// bundle template. Run: node scripts/gen-client.mjs
//
// Palette sources: Solarized (Ethan Schoonover, MIT) and Selenized
// (Jan Warchol, MIT). Token key set mirrors the alias/specific/shiki tables
// shipped by @deepseek-ai/dsh-client-ui-theme.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const hex = (r, g, b) =>
	"#" + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");

const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

const rgba = (c, a) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

const SOLARIZED = {
	base03: [0, 43, 54], base02: [7, 54, 66], base01: [88, 110, 117],
	base00: [101, 123, 131], base0: [131, 148, 150], base1: [147, 161, 161],
	base2: [238, 232, 213], base3: [253, 246, 227],
	yellow: [181, 137, 0], orange: [203, 75, 22], red: [220, 50, 47],
	magenta: [211, 54, 130], violet: [108, 113, 196], blue: [38, 139, 210],
	cyan: [42, 161, 152], green: [133, 153, 0],
};

const SEL_D = {
	bg0: [16, 60, 72], bg1: [24, 73, 86], bg2: [45, 91, 105],
	dim0: [114, 137, 143], fg0: [173, 188, 188], fg1: [202, 216, 217],
	red: [250, 87, 80], green: [117, 185, 56], yellow: [219, 179, 45],
	blue: [70, 149, 247], magenta: [242, 117, 190], cyan: [65, 199, 185],
	orange: [237, 134, 73], violet: [175, 136, 235],
};

const SEL_L = {
	bg0: [251, 243, 219], bg1: [236, 227, 204], bg2: [213, 205, 182],
	dim0: [144, 153, 149], fg0: [83, 103, 109], fg1: [58, 77, 83],
	red: [210, 33, 45], green: [72, 145, 0], yellow: [173, 137, 0],
	blue: [0, 114, 212], magenta: [202, 72, 152], cyan: [0, 156, 143],
	orange: [194, 93, 30], violet: [135, 98, 198],
};

const DARK = { mask1: "rgba(0, 0, 0, 0.5)", mask2: "rgba(0, 0, 0, 0.2)", mask3: "rgba(0, 0, 0, 0.48)", maskPhoto: "rgba(0, 0, 0, 0.88)", skeleton: "rgba(255, 255, 255, 0.08)", inv: "rgba(255, 255, 255, 0.06)", inv2: "rgba(255, 255, 255, 0.08)" };
const LIGHT = { mask1: "rgba(0, 0, 0, 0.24)", mask2: "rgba(0, 0, 0, 0.12)", mask3: "rgba(0, 0, 0, 0.48)", maskPhoto: "rgba(0, 0, 0, 0.88)", skeleton: "rgba(0, 0, 0, 0.04)", inv: "rgba(0, 0, 0, 0)", inv2: "rgba(0, 0, 0, 0)" };

function buildSolarizedDark() {
	const P = SOLARIZED;
	const L2 = mix(P.base02, P.base01, 0.2), L3 = mix(P.base02, P.base01, 0.35), OV = mix(P.base02, P.base01, 0.3);
	const M2 = mix(P.base02, P.base01, 0.15), M1 = mix(P.base03, P.base02, 0.5), GH = mix(P.base02, P.base01, 0.28);
	const SOLID = mix(P.base02, P.base01, 0.25), CIT = SOLID, SEGS = M2, SEGU = mix(P.base02, P.base01, 0.08);
	const CB = mix(P.base03, [0, 0, 0], 0.15), BAN = mix(P.base03, P.base02, 0.6);
	return {
		"--dsw-alias-bg-base": hex(...P.base03),
		"--dsw-alias-bg-layer-1": hex(...P.base02),
		"--dsw-alias-bg-layer-2": hex(...L2),
		"--dsw-alias-bg-layer-3": hex(...L3),
		"--dsw-alias-bg-mask-1": DARK.mask1,
		"--dsw-alias-bg-mask-2": DARK.mask2,
		"--dsw-alias-bg-mask-3": DARK.mask3,
		"--dsw-alias-bg-mask-photo": DARK.maskPhoto,
		"--dsw-alias-bg-module-platform": hex(...M1),
		"--dsw-alias-bg-multi-select": hex(...M2),
		"--dsw-alias-bg-overlay": hex(...OV),
		"--dsw-alias-bg-skeleton": DARK.skeleton,
		"--dsw-alias-border-inverted": DARK.inv,
		"--dsw-alias-border-inverted2": DARK.inv2,
		"--dsw-alias-border-l1": rgba(P.base1, 0.14),
		"--dsw-alias-border-l2-darkmode-thin": rgba(P.base1, 0.14),
		"--dsw-alias-border-l2": rgba(P.base1, 0.26),
		"--dsw-alias-border-l3": rgba(P.base1, 0.36),
		"--dsw-alias-border-l4": rgba(P.base1, 0.5),
		"--dsw-alias-brand-primary-invert": hex(...P.base3),
		"--dsw-alias-brand-primary-new-colorprimary-new-color": hex(...P.blue),
		"--dsw-static-deepseek-500": hex(...P.blue),
		"--dsw-static-deepseek-200": hex(...mix(P.blue, [255, 255, 255], 0.4)),
		"--dsw-static-blue-450": hex(...P.blue),
		"--dsw-static-blue-500": hex(...P.blue),
		"--dsw-static-neutral-bluish-400": hex(...P.base01),
		"--dsw-alias-brand-primary": hex(...P.blue),
		"--dsw-alias-brand-text": "#ffffff",
		"--dsw-alias-button-contrast-fill": hex(...P.base01),
		"--dsw-alias-button-elevated-fill": hex(...M1),
		"--dsw-alias-button-floating-fill": hex(...M2),
		"--dsw-alias-button-floating-hover": hex(...M2),
		"--dsw-alias-button-ghost-active-border": rgba(P.base0, 0.4),
		"--dsw-alias-button-ghost-active-fill": hex(...L2),
		"--dsw-alias-button-ghost-active-hover": hex(...GH),
		"--dsw-alias-button-info-fill": hex(...P.cyan),
		"--dsw-alias-button-info-hover": hex(...mix(P.cyan, P.base1, 0.25)),
		"--dsw-slz-sky": hex(...P.cyan),
		"--dsw-slz-peach": hex(...P.orange),
		"--dsw-slz-lavender": hex(...P.violet),
		"--dsw-slz-blue": hex(...P.blue),
		"--dsw-alias-button-primary-dimmed": hex(...L2),
		"--dsw-alias-button-primary-fill": hex(...P.blue),
		"--dsw-alias-button-primary-hover": hex(...mix(P.blue, P.base1, 0.25)),
		"--dsw-alias-button-tool-bar-fill": rgba(P.base01, 0.5),
		"--dsw-alias-button-tool-bar-fill-invisible": rgba(P.base01, 0.36),
		"--dsw-alias-button-tool-bar-hover": rgba(P.base01, 0.6),
		"--dsw-alias-interactive-bg-active": rgba(P.blue, 0.2),
		"--dsw-alias-interactive-bg-hover-accent": rgba(P.blue, 0.28),
		"--dsw-alias-interactive-bg-hover-danger": rgba(P.red, 0.15),
		"--dsw-alias-interactive-bg-hover-solid": hex(...SOLID),
		"--dsw-alias-interactive-bg-hover": rgba(P.blue, 0.12),
		"--dsw-alias-label-caption": hex(...P.base01),
		"--dsw-alias-label-dimmed": hex(...P.base01),
		"--dsw-alias-label-primary-bluish": hex(...mix(P.base1, P.blue, 0.25)),
		"--dsw-alias-label-primary-dimmed": hex(...mix(P.base1, P.base0, 0.5)),
		"--dsw-alias-label-primary-foreground": hex(...P.base03),
		"--dsw-alias-label-primary-inverted": hex(...P.base03),
		"--dsw-alias-label-primary": hex(...P.base1),
		"--dsw-alias-label-secondary": hex(...P.base0),
		"--dsw-alias-label-tertiary": hex(...P.base00),
		"--dsw-alias-markdown-citation": hex(...CIT),
		"--dsw-alias-markdown-code-block-banner": hex(...BAN),
		"--dsw-alias-markdown-code-block": hex(...CB),
		"--dsw-alias-markdown-code-segment-selected": hex(...SEGS),
		"--dsw-alias-markdown-code-segment-unselected": hex(...SEGU),
		"--dsw-alias-markdown-inline-code": hex(...P.base02),
		"--dsw-alias-markdown-placeholder": hex(...M1),
		"--dsw-alias-markdown-tag": hex(...M2),
		"--dsw-alias-scrollbar-bg-l1": hex(...L2),
		"--dsw-alias-scrollbar-bg-l2": hex(...GH),
		"--dsw-alias-scrollbar-hover-l1": hex(...mix(P.base02, P.base01, 0.45)),
		"--dsw-alias-scrollbar-hover-l2": hex(...mix(P.base02, P.base01, 0.5)),
		"--dsw-alias-state-business-primary": hex(...P.blue),
		"--dsw-alias-state-business-tertiary": hex(...L2),
		"--dsw-alias-state-error-primary": hex(...P.red),
		"--dsw-alias-state-error-secondary": hex(...mix(P.red, P.base1, 0.25)),
		"--dsw-alias-state-success-primary": hex(...P.green),
		"--dsw-alias-state-success-secondary": hex(...mix(P.green, P.base1, 0.3)),
		"--dsw-alias-state-success-tertiary": hex(...mix(P.base02, P.green, 0.15)),
		"--dsw-alias-state-warn-label": hex(...P.yellow),
		"--dsw-alias-state-warn-primary": hex(...mix(P.yellow, P.base1, 0.2)),
		"--dsw-alias-state-warn-secondary": hex(...mix(P.yellow, P.base1, 0.35)),
		"--dsw-alias-state-warn-tertiary": hex(...mix(P.base02, P.yellow, 0.12)),
		"--dsw-alias-toast-bg": hex(...SOLID),
		"--dsw-alias-tooltip-bg": hex(...L3),
		"--dsw-specific-bubble": hex(...mix(P.base02, P.blue, 0.1)),
		"--dsw-specific-bubble-highlight": hex(...mix(P.base02, P.blue, 0.22)),
		"--dsw-specific-input-major": hex(...P.base02),
		"--dsw-specific-login-input": hex(...SEGU),
		"--dsw-specific-menu": hex(...L3),
		"--dsw-specific-selector": hex(...SEGU),
		"--dsw-specific-sidebar-fill": hex(...P.base03),
		"--dsw-specific-sidebar-nav-item-active-accent": hex(...mix(P.base02, P.blue, 0.3)),
		"--dsw-specific-sidebar-nav-item-active": hex(...SOLID),
		"--dsw-specific-sidebar-nav-item-hover": hex(...mix(P.base03, P.base02, 0.6)),
		"--dsw-specific-tip": hex(...M1),
		"--shiki-foreground": hex(...P.base0),
		"--shiki-background": hex(...CB),
		"--shiki-token-constant": hex(...P.cyan),
		"--shiki-token-string": hex(...P.cyan),
		"--shiki-token-comment": hex(...P.base01),
		"--shiki-token-keyword": hex(...P.green),
		"--shiki-token-parameter": hex(...P.orange),
		"--shiki-token-function": hex(...P.blue),
		"--shiki-token-string-expression": hex(...P.cyan),
		"--shiki-token-punctuation": hex(...P.base00),
		"--shiki-token-link": hex(...P.violet),
	};
}

function buildSolarizedLight() {
	const P = SOLARIZED;
	const L2 = mix(P.base2, P.base1, 0.12), L3 = mix(P.base2, P.base1, 0.22), OV = mix(P.base2, P.base1, 0.18);
	const M2 = mix(P.base2, P.base1, 0.08), M1 = mix(P.base3, P.base2, 0.5), GH = mix(P.base2, P.base1, 0.25);
	const SOLID = L2, CIT = L2, SEGS = mix(P.base3, [255, 255, 255], 0.6), SEGU = L2;
	const WHT6 = mix(P.base3, [255, 255, 255], 0.6), WHT4 = mix(P.base3, [255, 255, 255], 0.4);
	const CB = mix(P.base2, P.base1, 0.06), BAN = mix(P.base2, P.base1, 0.1);
	return {
		"--dsw-alias-bg-base": hex(...P.base3),
		"--dsw-alias-bg-layer-1": hex(...P.base2),
		"--dsw-alias-bg-layer-2": hex(...L2),
		"--dsw-alias-bg-layer-3": hex(...L3),
		"--dsw-alias-bg-mask-1": LIGHT.mask1,
		"--dsw-alias-bg-mask-2": LIGHT.mask2,
		"--dsw-alias-bg-mask-3": LIGHT.mask3,
		"--dsw-alias-bg-mask-photo": LIGHT.maskPhoto,
		"--dsw-alias-bg-module-platform": hex(...M1),
		"--dsw-alias-bg-multi-select": hex(...M2),
		"--dsw-alias-bg-overlay": hex(...OV),
		"--dsw-alias-bg-skeleton": LIGHT.skeleton,
		"--dsw-alias-border-inverted": LIGHT.inv,
		"--dsw-alias-border-inverted2": LIGHT.inv2,
		"--dsw-alias-border-l1": rgba(P.base00, 0.14),
		"--dsw-alias-border-l2-darkmode-thin": rgba(P.base00, 0.2),
		"--dsw-alias-border-l2": rgba(P.base00, 0.22),
		"--dsw-alias-border-l3": rgba(P.base00, 0.32),
		"--dsw-alias-border-l4": rgba(P.base00, 0.45),
		"--dsw-alias-brand-primary-invert": hex(...P.base03),
		"--dsw-alias-brand-primary-new-colorprimary-new-color": hex(...P.blue),
		"--dsw-static-deepseek-500": hex(...P.blue),
		"--dsw-static-deepseek-200": hex(...mix(P.blue, [255, 255, 255], 0.4)),
		"--dsw-static-blue-450": hex(...P.blue),
		"--dsw-static-blue-500": hex(...P.blue),
		"--dsw-static-neutral-bluish-400": hex(...P.base00),
		"--dsw-alias-brand-primary": hex(...P.blue),
		"--dsw-alias-brand-text": "#ffffff",
		"--dsw-alias-button-contrast-fill": hex(...P.base1),
		"--dsw-alias-button-elevated-fill": hex(...WHT6),
		"--dsw-alias-button-floating-fill": hex(...WHT6),
		"--dsw-alias-button-floating-hover": hex(...WHT4),
		"--dsw-alias-button-ghost-active-border": rgba(P.base00, 0.35),
		"--dsw-alias-button-ghost-active-fill": hex(...OV),
		"--dsw-alias-button-ghost-active-hover": hex(...GH),
		"--dsw-alias-button-info-fill": hex(...P.cyan),
		"--dsw-alias-button-info-hover": hex(...mix(P.cyan, P.base3, 0.25)),
		"--dsw-slz-sky": hex(...P.cyan),
		"--dsw-slz-peach": hex(...P.orange),
		"--dsw-slz-lavender": hex(...P.violet),
		"--dsw-slz-blue": hex(...P.blue),
		"--dsw-alias-button-primary-dimmed": hex(...L2),
		"--dsw-alias-button-primary-fill": hex(...P.blue),
		"--dsw-alias-button-primary-hover": hex(...mix(P.blue, P.base3, 0.18)),
		"--dsw-alias-button-tool-bar-fill": rgba(P.base00, 0.5),
		"--dsw-alias-button-tool-bar-fill-invisible": rgba(P.base00, 0.36),
		"--dsw-alias-button-tool-bar-hover": rgba(P.base00, 0.6),
		"--dsw-alias-interactive-bg-active": rgba(P.blue, 0.16),
		"--dsw-alias-interactive-bg-hover-accent": rgba(P.blue, 0.22),
		"--dsw-alias-interactive-bg-hover-danger": rgba(P.red, 0.06),
		"--dsw-alias-interactive-bg-hover-solid": hex(...SOLID),
		"--dsw-alias-interactive-bg-hover": rgba(P.blue, 0.1),
		"--dsw-alias-label-caption": hex(...P.base00),
		"--dsw-alias-label-dimmed": hex(...mix(P.base2, P.base1, 0.3)),
		"--dsw-alias-label-primary-bluish": hex(...mix(P.base01, P.blue, 0.15)),
		"--dsw-alias-label-primary-dimmed": hex(...mix(P.base00, P.base0, 0.5)),
		"--dsw-alias-label-primary-foreground": hex(...P.base3),
		"--dsw-alias-label-primary-inverted": hex(...P.base3),
		"--dsw-alias-label-primary": hex(...P.base01),
		"--dsw-alias-label-secondary": hex(...P.base00),
		"--dsw-alias-label-tertiary": hex(...P.base0),
		"--dsw-alias-markdown-citation": hex(...CIT),
		"--dsw-alias-markdown-code-block-banner": hex(...BAN),
		"--dsw-alias-markdown-code-block": hex(...CB),
		"--dsw-alias-markdown-code-segment-selected": hex(...SEGS),
		"--dsw-alias-markdown-code-segment-unselected": hex(...SEGU),
		"--dsw-alias-markdown-inline-code": hex(...M2),
		"--dsw-alias-markdown-placeholder": hex(...M1),
		"--dsw-alias-markdown-tag": hex(...L2),
		"--dsw-alias-scrollbar-bg-l1": hex(...L3),
		"--dsw-alias-scrollbar-bg-l2": hex(...GH),
		"--dsw-alias-scrollbar-hover-l1": hex(...mix(P.base2, P.base1, 0.38)),
		"--dsw-alias-scrollbar-hover-l2": hex(...mix(P.base2, P.base1, 0.45)),
		"--dsw-alias-state-business-primary": hex(...P.blue),
		"--dsw-alias-state-business-tertiary": hex(...mix(P.base2, P.blue, 0.15)),
		"--dsw-alias-state-error-primary": hex(...P.red),
		"--dsw-alias-state-error-secondary": hex(...mix(P.red, P.base3, 0.3)),
		"--dsw-alias-state-success-primary": hex(...P.green),
		"--dsw-alias-state-success-secondary": hex(...mix(P.green, P.base3, 0.25)),
		"--dsw-alias-state-success-tertiary": hex(...mix(P.base2, P.green, 0.12)),
		"--dsw-alias-state-warn-label": hex(...mix(P.yellow, P.base00, 0.1)),
		"--dsw-alias-state-warn-primary": hex(...P.yellow),
		"--dsw-alias-state-warn-secondary": hex(...mix(P.yellow, P.base3, 0.25)),
		"--dsw-alias-state-warn-tertiary": hex(...mix(P.base2, P.yellow, 0.12)),
		"--dsw-alias-toast-bg": hex(...GH),
		"--dsw-alias-tooltip-bg": hex(...mix(P.base2, P.base1, 0.3)),
		"--dsw-specific-bubble": hex(...mix(P.base3, P.blue, 0.08)),
		"--dsw-specific-bubble-highlight": hex(...mix(P.base2, P.blue, 0.2)),
		"--dsw-specific-input-major": hex(...P.base3),
		"--dsw-specific-login-input": hex(...M1),
		"--dsw-specific-menu": hex(...L3),
		"--dsw-specific-selector": hex(...M1),
		"--dsw-specific-sidebar-fill": hex(...P.base2),
		"--dsw-specific-sidebar-nav-item-active-accent": hex(...mix(P.base2, P.blue, 0.15)),
		"--dsw-specific-sidebar-nav-item-active": hex(...L2),
		"--dsw-specific-sidebar-nav-item-hover": hex(...mix(P.base2, P.base1, 0.06)),
		"--dsw-specific-tip": hex(...M1),
		"--shiki-foreground": hex(...P.base01),
		"--shiki-background": hex(...CB),
		"--shiki-token-constant": hex(...P.cyan),
		"--shiki-token-string": hex(...P.cyan),
		"--shiki-token-comment": hex(...P.base1),
		"--shiki-token-keyword": hex(...P.green),
		"--shiki-token-parameter": hex(...P.orange),
		"--shiki-token-function": hex(...P.blue),
		"--shiki-token-string-expression": hex(...P.cyan),
		"--shiki-token-punctuation": hex(...P.base00),
		"--shiki-token-link": hex(...P.violet),
	};
}

function buildSelenizedDark() {
	const P = SEL_D;
	const L2 = mix(P.bg2, P.dim0, 0.2), L3 = mix(P.bg2, P.dim0, 0.35), OV = mix(P.bg2, P.dim0, 0.3);
	const M2 = mix(P.bg1, P.bg2, 0.5), M1 = mix(P.bg0, P.bg1, 0.5), GH = mix(P.bg2, P.dim0, 0.28);
	const SOLID = mix(P.bg2, P.dim0, 0.25), CIT = L2, SEGS = mix(P.bg2, P.dim0, 0.15), SEGU = mix(P.bg0, P.bg1, 0.4);
	const ELEV = mix(P.bg2, P.dim0, 0.15), FL = mix(P.bg2, P.dim0, 0.12), FLH = mix(P.bg2, P.dim0, 0.2);
	const CB = mix(P.bg0, [0, 0, 0], 0.15);
	return {
		"--dsw-alias-bg-base": hex(...P.bg0),
		"--dsw-alias-bg-layer-1": hex(...P.bg1),
		"--dsw-alias-bg-layer-2": hex(...P.bg2),
		"--dsw-alias-bg-layer-3": hex(...L3),
		"--dsw-alias-bg-mask-1": DARK.mask1,
		"--dsw-alias-bg-mask-2": DARK.mask2,
		"--dsw-alias-bg-mask-3": DARK.mask3,
		"--dsw-alias-bg-mask-photo": DARK.maskPhoto,
		"--dsw-alias-bg-module-platform": hex(...M1),
		"--dsw-alias-bg-multi-select": hex(...M2),
		"--dsw-alias-bg-overlay": hex(...OV),
		"--dsw-alias-bg-skeleton": DARK.skeleton,
		"--dsw-alias-border-inverted": DARK.inv,
		"--dsw-alias-border-inverted2": DARK.inv2,
		"--dsw-alias-border-l1": rgba(P.fg0, 0.12),
		"--dsw-alias-border-l2-darkmode-thin": rgba(P.fg0, 0.12),
		"--dsw-alias-border-l2": rgba(P.fg0, 0.22),
		"--dsw-alias-border-l3": rgba(P.fg0, 0.32),
		"--dsw-alias-border-l4": rgba(P.fg0, 0.45),
		"--dsw-alias-brand-primary-invert": hex(...P.fg1),
		"--dsw-alias-brand-primary-new-colorprimary-new-color": hex(...P.blue),
		"--dsw-static-deepseek-500": hex(...P.blue),
		"--dsw-static-deepseek-200": hex(...mix(P.blue, [255, 255, 255], 0.4)),
		"--dsw-static-blue-450": hex(...P.blue),
		"--dsw-static-blue-500": hex(...P.blue),
		"--dsw-static-neutral-bluish-400": hex(...P.dim0),
		"--dsw-alias-brand-primary": hex(...P.blue),
		"--dsw-alias-brand-text": "#ffffff",
		"--dsw-alias-button-contrast-fill": hex(...P.dim0),
		"--dsw-alias-button-elevated-fill": hex(...ELEV),
		"--dsw-alias-button-floating-fill": hex(...FL),
		"--dsw-alias-button-floating-hover": hex(...FLH),
		"--dsw-alias-button-ghost-active-border": rgba(P.fg0, 0.4),
		"--dsw-alias-button-ghost-active-fill": hex(...FLH),
		"--dsw-alias-button-ghost-active-hover": hex(...GH),
		"--dsw-alias-button-info-fill": hex(...P.cyan),
		"--dsw-alias-button-info-hover": hex(...mix(P.cyan, P.fg1, 0.25)),
		"--dsw-slz-sky": hex(...P.cyan),
		"--dsw-slz-peach": hex(...P.orange),
		"--dsw-slz-lavender": hex(...P.violet),
		"--dsw-slz-blue": hex(...P.blue),
		"--dsw-alias-button-primary-dimmed": hex(...FLH),
		"--dsw-alias-button-primary-fill": hex(...P.blue),
		"--dsw-alias-button-primary-hover": hex(...mix(P.blue, P.fg1, 0.22)),
		"--dsw-alias-button-tool-bar-fill": rgba(P.dim0, 0.5),
		"--dsw-alias-button-tool-bar-fill-invisible": rgba(P.dim0, 0.36),
		"--dsw-alias-button-tool-bar-hover": rgba(P.dim0, 0.6),
		"--dsw-alias-interactive-bg-active": rgba(P.blue, 0.2),
		"--dsw-alias-interactive-bg-hover-accent": rgba(P.blue, 0.28),
		"--dsw-alias-interactive-bg-hover-danger": rgba(P.red, 0.15),
		"--dsw-alias-interactive-bg-hover-solid": hex(...SOLID),
		"--dsw-alias-interactive-bg-hover": rgba(P.blue, 0.12),
		"--dsw-alias-label-caption": hex(...P.dim0),
		"--dsw-alias-label-dimmed": hex(...OV),
		"--dsw-alias-label-primary-bluish": hex(...mix(P.fg1, P.blue, 0.2)),
		"--dsw-alias-label-primary-dimmed": hex(...mix(P.fg0, P.fg1, 0.5)),
		"--dsw-alias-label-primary-foreground": hex(...P.bg0),
		"--dsw-alias-label-primary-inverted": hex(...P.bg0),
		"--dsw-alias-label-primary": hex(...P.fg1),
		"--dsw-alias-label-secondary": hex(...P.fg0),
		"--dsw-alias-label-tertiary": hex(...P.dim0),
		"--dsw-alias-markdown-citation": hex(...CIT),
		"--dsw-alias-markdown-code-block-banner": hex(...M1),
		"--dsw-alias-markdown-code-block": hex(...CB),
		"--dsw-alias-markdown-code-segment-selected": hex(...SEGS),
		"--dsw-alias-markdown-code-segment-unselected": hex(...SEGU),
		"--dsw-alias-markdown-inline-code": hex(...P.bg1),
		"--dsw-alias-markdown-placeholder": hex(...M1),
		"--dsw-alias-markdown-tag": hex(...SEGS),
		"--dsw-alias-scrollbar-bg-l1": hex(...SEGS),
		"--dsw-alias-scrollbar-bg-l2": hex(...FLH),
		"--dsw-alias-scrollbar-hover-l1": hex(...mix(P.bg2, P.dim0, 0.4)),
		"--dsw-alias-scrollbar-hover-l2": hex(...mix(P.bg2, P.dim0, 0.45)),
		"--dsw-alias-state-business-primary": hex(...P.blue),
		"--dsw-alias-state-business-tertiary": hex(...mix(P.bg2, P.blue, 0.15)),
		"--dsw-alias-state-error-primary": hex(...P.red),
		"--dsw-alias-state-error-secondary": hex(...mix(P.red, P.fg1, 0.25)),
		"--dsw-alias-state-success-primary": hex(...P.green),
		"--dsw-alias-state-success-secondary": hex(...mix(P.green, P.fg1, 0.3)),
		"--dsw-alias-state-success-tertiary": hex(...mix(P.bg2, P.green, 0.15)),
		"--dsw-alias-state-warn-label": hex(...P.yellow),
		"--dsw-alias-state-warn-primary": hex(...P.yellow),
		"--dsw-alias-state-warn-secondary": hex(...mix(P.yellow, P.fg1, 0.3)),
		"--dsw-alias-state-warn-tertiary": hex(...mix(P.bg2, P.yellow, 0.15)),
		"--dsw-alias-toast-bg": hex(...SOLID),
		"--dsw-alias-tooltip-bg": hex(...L3),
		"--dsw-specific-bubble": hex(...mix(P.bg1, P.blue, 0.1)),
		"--dsw-specific-bubble-highlight": hex(...mix(P.bg1, P.blue, 0.25)),
		"--dsw-specific-input-major": hex(...P.bg1),
		"--dsw-specific-login-input": hex(...SEGU),
		"--dsw-specific-menu": hex(...L3),
		"--dsw-specific-selector": hex(...SEGU),
		"--dsw-specific-sidebar-fill": hex(...P.bg0),
		"--dsw-specific-sidebar-nav-item-active-accent": hex(...mix(P.bg2, P.blue, 0.2)),
		"--dsw-specific-sidebar-nav-item-active": hex(...FLH),
		"--dsw-specific-sidebar-nav-item-hover": hex(...mix(P.bg0, P.bg1, 0.6)),
		"--dsw-specific-tip": hex(...M1),
		"--shiki-foreground": hex(...P.fg0),
		"--shiki-background": hex(...CB),
		"--shiki-token-constant": hex(...P.cyan),
		"--shiki-token-string": hex(...P.green),
		"--shiki-token-comment": hex(...P.dim0),
		"--shiki-token-keyword": hex(...P.violet),
		"--shiki-token-parameter": hex(...P.orange),
		"--shiki-token-function": hex(...P.blue),
		"--shiki-token-string-expression": hex(...P.green),
		"--shiki-token-punctuation": hex(...P.dim0),
		"--shiki-token-link": hex(...P.yellow),
	};
}

function buildSelenizedLight() {
	const P = SEL_L;
	const L2 = P.bg2, L3 = mix(P.bg2, P.dim0, 0.3), OV = mix(P.bg1, P.dim0, 0.24);
	const M2 = mix(P.bg1, P.bg2, 0.5), M1 = mix(P.bg0, P.bg1, 0.5), GH = mix(P.bg1, P.dim0, 0.25);
	const SOLID = L2, CIT = L2, SEGS = mix(P.bg0, [255, 255, 255], 0.5), SEGU = mix(P.bg1, P.dim0, 0.12);
	const WHT5 = mix(P.bg0, [255, 255, 255], 0.5), WHT3 = mix(P.bg0, [255, 255, 255], 0.3);
	const CB = mix(P.bg1, P.dim0, 0.06);
	return {
		"--dsw-alias-bg-base": hex(...P.bg0),
		"--dsw-alias-bg-layer-1": hex(...P.bg1),
		"--dsw-alias-bg-layer-2": hex(...L2),
		"--dsw-alias-bg-layer-3": hex(...L3),
		"--dsw-alias-bg-mask-1": LIGHT.mask1,
		"--dsw-alias-bg-mask-2": LIGHT.mask2,
		"--dsw-alias-bg-mask-3": LIGHT.mask3,
		"--dsw-alias-bg-mask-photo": LIGHT.maskPhoto,
		"--dsw-alias-bg-module-platform": hex(...M1),
		"--dsw-alias-bg-multi-select": hex(...M2),
		"--dsw-alias-bg-overlay": hex(...OV),
		"--dsw-alias-bg-skeleton": LIGHT.skeleton,
		"--dsw-alias-border-inverted": LIGHT.inv,
		"--dsw-alias-border-inverted2": LIGHT.inv2,
		"--dsw-alias-border-l1": rgba(P.fg0, 0.12),
		"--dsw-alias-border-l2-darkmode-thin": rgba(P.fg0, 0.18),
		"--dsw-alias-border-l2": rgba(P.fg0, 0.22),
		"--dsw-alias-border-l3": rgba(P.fg0, 0.32),
		"--dsw-alias-border-l4": rgba(P.fg0, 0.45),
		"--dsw-alias-brand-primary-invert": hex(...P.bg0),
		"--dsw-alias-brand-primary-new-colorprimary-new-color": hex(...P.blue),
		"--dsw-static-deepseek-500": hex(...P.blue),
		"--dsw-static-deepseek-200": hex(...mix(P.blue, [255, 255, 255], 0.4)),
		"--dsw-static-blue-450": hex(...P.blue),
		"--dsw-static-blue-500": hex(...P.blue),
		"--dsw-static-neutral-bluish-400": hex(...P.dim0),
		"--dsw-alias-brand-primary": hex(...P.blue),
		"--dsw-alias-brand-text": "#ffffff",
		"--dsw-alias-button-contrast-fill": hex(...P.fg0),
		"--dsw-alias-button-elevated-fill": hex(...WHT5),
		"--dsw-alias-button-floating-fill": hex(...WHT5),
		"--dsw-alias-button-floating-hover": hex(...WHT3),
		"--dsw-alias-button-ghost-active-border": rgba(P.fg0, 0.35),
		"--dsw-alias-button-ghost-active-fill": hex(...OV),
		"--dsw-alias-button-ghost-active-hover": hex(...GH),
		"--dsw-alias-button-info-fill": hex(...P.cyan),
		"--dsw-alias-button-info-hover": hex(...mix(P.cyan, P.bg0, 0.2)),
		"--dsw-slz-sky": hex(...P.cyan),
		"--dsw-slz-peach": hex(...P.orange),
		"--dsw-slz-lavender": hex(...P.violet),
		"--dsw-slz-blue": hex(...P.blue),
		"--dsw-alias-button-primary-dimmed": hex(...L2),
		"--dsw-alias-button-primary-fill": hex(...P.blue),
		"--dsw-alias-button-primary-hover": hex(...mix(P.blue, P.bg0, 0.15)),
		"--dsw-alias-button-tool-bar-fill": rgba(P.fg0, 0.4),
		"--dsw-alias-button-tool-bar-fill-invisible": rgba(P.fg0, 0.3),
		"--dsw-alias-button-tool-bar-hover": rgba(P.fg0, 0.5),
		"--dsw-alias-interactive-bg-active": rgba(P.blue, 0.16),
		"--dsw-alias-interactive-bg-hover-accent": rgba(P.blue, 0.22),
		"--dsw-alias-interactive-bg-hover-danger": rgba(P.red, 0.06),
		"--dsw-alias-interactive-bg-hover-solid": hex(...SOLID),
		"--dsw-alias-interactive-bg-hover": rgba(P.blue, 0.1),
		"--dsw-alias-label-caption": hex(...P.dim0),
		"--dsw-alias-label-dimmed": hex(...L3),
		"--dsw-alias-label-primary-bluish": hex(...mix(P.fg1, P.blue, 0.15)),
		"--dsw-alias-label-primary-dimmed": hex(...mix(P.fg0, P.fg1, 0.5)),
		"--dsw-alias-label-primary-foreground": hex(...P.bg0),
		"--dsw-alias-label-primary-inverted": hex(...P.bg0),
		"--dsw-alias-label-primary": hex(...P.fg1),
		"--dsw-alias-label-secondary": hex(...P.fg0),
		"--dsw-alias-label-tertiary": hex(...P.dim0),
		"--dsw-alias-markdown-citation": hex(...CIT),
		"--dsw-alias-markdown-code-block-banner": hex(...mix(P.bg1, P.dim0, 0.1)),
		"--dsw-alias-markdown-code-block": hex(...CB),
		"--dsw-alias-markdown-code-segment-selected": hex(...SEGS),
		"--dsw-alias-markdown-code-segment-unselected": hex(...SEGU),
		"--dsw-alias-markdown-inline-code": hex(...M2),
		"--dsw-alias-markdown-placeholder": hex(...M1),
		"--dsw-alias-markdown-tag": hex(...SEGU),
		"--dsw-alias-scrollbar-bg-l1": hex(...GH),
		"--dsw-alias-scrollbar-bg-l2": hex(...L3),
		"--dsw-alias-scrollbar-hover-l1": hex(...mix(P.bg1, P.dim0, 0.4)),
		"--dsw-alias-scrollbar-hover-l2": hex(...mix(P.bg1, P.dim0, 0.45)),
		"--dsw-alias-state-business-primary": hex(...P.blue),
		"--dsw-alias-state-business-tertiary": hex(...mix(P.bg1, P.blue, 0.12)),
		"--dsw-alias-state-error-primary": hex(...P.red),
		"--dsw-alias-state-error-secondary": hex(...mix(P.red, P.bg0, 0.3)),
		"--dsw-alias-state-success-primary": hex(...P.green),
		"--dsw-alias-state-success-secondary": hex(...mix(P.green, P.bg0, 0.3)),
		"--dsw-alias-state-success-tertiary": hex(...mix(P.bg1, P.green, 0.12)),
		"--dsw-alias-state-warn-label": hex(...P.yellow),
		"--dsw-alias-state-warn-primary": hex(...P.yellow),
		"--dsw-alias-state-warn-secondary": hex(...mix(P.yellow, P.bg0, 0.25)),
		"--dsw-alias-state-warn-tertiary": hex(...mix(P.bg1, P.yellow, 0.12)),
		"--dsw-alias-toast-bg": hex(...GH),
		"--dsw-alias-tooltip-bg": hex(...L3),
		"--dsw-specific-bubble": hex(...mix(P.bg0, P.blue, 0.06)),
		"--dsw-specific-bubble-highlight": hex(...mix(P.bg1, P.blue, 0.2)),
		"--dsw-specific-input-major": hex(...P.bg0),
		"--dsw-specific-login-input": hex(...M1),
		"--dsw-specific-menu": hex(...L3),
		"--dsw-specific-selector": hex(...M1),
		"--dsw-specific-sidebar-fill": hex(...P.bg1),
		"--dsw-specific-sidebar-nav-item-active-accent": hex(...mix(P.bg1, P.blue, 0.14)),
		"--dsw-specific-sidebar-nav-item-active": hex(...L2),
		"--dsw-specific-sidebar-nav-item-hover": hex(...mix(P.bg1, P.dim0, 0.06)),
		"--dsw-specific-tip": hex(...M1),
		"--shiki-foreground": hex(...P.fg0),
		"--shiki-background": hex(...CB),
		"--shiki-token-constant": hex(...P.cyan),
		"--shiki-token-string": hex(...P.green),
		"--shiki-token-comment": hex(...P.dim0),
		"--shiki-token-keyword": hex(...P.violet),
		"--shiki-token-parameter": hex(...P.orange),
		"--shiki-token-function": hex(...P.blue),
		"--shiki-token-string-expression": hex(...P.green),
		"--shiki-token-punctuation": hex(...P.dim0),
		"--shiki-token-link": hex(...P.yellow),
	};
}

const THEMES = [
	{ id: "solarized-dark", colorScheme: "dark", tokens: buildSolarizedDark() },
	{ id: "solarized-light", colorScheme: "light", tokens: buildSolarizedLight() },
	{ id: "selenized-dark", colorScheme: "dark", tokens: buildSelenizedDark() },
	{ id: "selenized-light", colorScheme: "light", tokens: buildSelenizedLight() },
];

function tokensBlock() {
	const out = [];
	for (const theme of THEMES) {
		out.push(`\t{\n\t\tid: "${theme.id}",\n\t\tcolorScheme: "${theme.colorScheme}",\n\t\ttokens: {`);
		for (const [key, value] of Object.entries(theme.tokens)) {
			out.push(`\t\t\t"${key}": "${value}",`);
		}
		out.push(`\t\t}\n\t},`);
	}
	return out.join("\n");
}

const CLIENT_TEMPLATE = `// Solarized-dsh-theme — browser half (client plugin bundle).
//
// Loaded by dsh-client-modules at /plugins/@yuquexianzhou/solarized-dsh-theme/client.js and
// executed through the vendored cordis Loader's lazy-CJS module table
// (window.__ModuleLoader__.load). The factory body is plain CJS with
// require() resolved against the shell's module table — the same shape the
// shipped ui-* packages' tsdown bundles emit.
//
// Persistence note: the chosen theme is stored in localStorage. DSH's Host
// settings wire only exposes an allowlisted set of namespaces to browser
// clients (dsh-host-apiproxy's WEB_SETTINGS_NAMESPACES), so a third-party
// namespace would answer "settings-not-exposed"; the product itself keeps
// remote browser preferences process-local, and localStorage matches that
// boundary for a visual preference while surviving reloads on the same
// origin.
//
// Token tables are generated by scripts/gen-client.mjs from the Solarized
// (Ethan Schoonover, MIT) and Selenized (Jan Warchol, MIT) palettes; the
// key set mirrors the alias/specific/shiki sheets shipped by
// @deepseek-ai/dsh-client-ui-theme.
window.__ModuleLoader__.load({
	id: "@yuquexianzhou/solarized-dsh-theme",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _react = require("react");
		let _runtime_client = require("@deepseek-ai/dsh-client-runtime/client");

		//#region @yuquexianzhou/solarized-dsh-theme: definitions
		/** The settings row's locale namespace. */
		const SETTINGS_NS = "settings.solarized";
		/** localStorage key holding the selected theme id. */
		const STORAGE_KEY = "solarized-dsh-theme:theme";
		/** localStorage key remembering the last built-in preference. */
		const RESTORE_KEY = "solarized-dsh-theme:restore";
		/** Sentinel meaning "no custom theme — follow the built-in appearance". */
		const DEFAULT_THEME = "system";

		/**
		 * The four curated themes. Each is a third-party theme for the built-in
		 * ThemeRuntime: an id, the base palette it builds on (colorScheme drives
		 * body[data-ds-dark-theme]), and token overrides applied as inline
		 * custom properties on <body> by ui-layout's ThemePresenter. Values are
		 * concrete colors (no var() indirection); the --shiki-* entries restore
		 * the canonical Solarized/Selenized code palette in markdown code blocks.
		 */
		const THEMES = [
__TOKENS__
		];

		/**
		 * Simplified Chinese dictionary (the key-set source of truth). Theme
		 * labels live under "theme.<id>" so the picker cards derive their key
		 * directly from the theme id — no id→key mapping to keep in sync.
		 */
		const zh = {
			"theme.title": "Solarized / Selenized 主题",
			"theme.default": "默认",
			"theme.solarized-dark": "Solarized 深色",
			"theme.solarized-light": "Solarized 浅色",
			"theme.selenized-dark": "Selenized 深色",
			"theme.selenized-light": "Selenized 浅色",
			"theme.checkUpdate": "检查更新",
			"theme.updating": "检查中…",
			"theme.updateError": "检查更新失败",
			"theme.updateCurrent": "当前",
			"theme.updateLatest": "最新",
			"theme.updateUpToDate": "已是最新版本"
		};

		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"theme.title": "Solarized / Selenized themes",
			"theme.default": "Default",
			"theme.solarized-dark": "Solarized Dark",
			"theme.solarized-light": "Solarized Light",
			"theme.selenized-dark": "Selenized Dark",
			"theme.selenized-light": "Selenized Light",
			"theme.checkUpdate": "Check for updates",
			"theme.updating": "Checking…",
			"theme.updateError": "Update check failed",
			"theme.updateCurrent": "Current",
			"theme.updateLatest": "Latest",
			"theme.updateUpToDate": "You're up to date"
		};
		//#endregion

		//#region @yuquexianzhou/solarized-dsh-theme: persistence
		/** Read a localStorage string value (null on absence or error). */
		function readStorage(key) {
			try {
				const value = window.localStorage.getItem(key);
				return typeof value === "string" ? value : null;
			} catch {
				return null;
			}
		}

		/** Write (or remove with null) a localStorage value. */
		function writeStorage(key, value) {
			try {
				if (value === null) window.localStorage.removeItem(key);
				else window.localStorage.setItem(key, value);
			} catch {
				// storage unavailable / quota — the preference stays process-local
			}
		}

		/** Saved theme id (may be unknown/absent). */
		function readSavedTheme() {
			return readStorage(STORAGE_KEY);
		}

		/** Persist a theme choice; DEFAULT_THEME clears the stored value. */
		function writeSavedTheme(id) {
			writeStorage(STORAGE_KEY, id === DEFAULT_THEME ? null : id);
		}

		/**
		 * Remember a built-in preference (system/light/dark) whenever the
		 * runtime is not on one of our themes, so turning the theme off
		 * hands the user back exactly what they had before the plugin —
		 * instead of dropping them onto "system".
		 */
		function rememberBuiltinPreference(preference) {
			if (THEMES.some((themeDefinition) => themeDefinition.id === preference)) return;
			if (preference === "light" || preference === "dark" || preference === DEFAULT_THEME) {
				writeStorage(RESTORE_KEY, preference);
			}
		}

		/** The preference to restore when turning the theme off (default: system). */
		function readRestoredPreference() {
			const raw = readStorage(RESTORE_KEY);
			return raw === "light" || raw === "dark" ? raw : DEFAULT_THEME;
		}
		//#endregion

		//#region @yuquexianzhou/solarized-dsh-theme: settings row store
		/**
		 * Theme row slot store: a mirror of the theme service snapshot. The
		 * plugin's theme/change listener is the only writer; the row component
		 * reads via props.useStore.
		 */
		function createThemeStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({
					theme: "system",
					revision: -1
				}),
				actions: {
					sync: (d, theme, revision) => {
						if (revision <= d.revision) return;
						d.theme = theme;
						d.revision = revision;
					}
				}
			});
		}
		//#endregion

		//#region @yuquexianzhou/solarized-dsh-theme: settings row
		/** Inline style sheet for the row (kept dependency-free). */
		const styles = {
			group: {
				borderBottom: "1px solid var(--dsw-alias-border-l2)",
				display: "flex",
				flexDirection: "column",
				gap: "10px",
				padding: "16px 0"
			},
			title: {
				color: "var(--dsw-alias-label-primary)",
				fontSize: "14px",
				fontWeight: 400,
				lineHeight: "22px"
			},
			grid: {
				display: "flex",
				flexWrap: "wrap",
				gap: "10px"
			},
			card: {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "6px",
				width: "96px",
				padding: "3px",
				borderRadius: "10px",
				// Longhands, not the border shorthand: React removes borderColor
				// on deselect, and with the shorthand gone too the remaining
				// width/style fall back to currentColor (black/white border).
				borderWidth: "2px",
				borderStyle: "solid",
				borderColor: "transparent",
				background: "transparent",
				cursor: "pointer",
				font: "inherit",
				boxSizing: "border-box"
			},
			cardSelected: {
				borderColor: "var(--dsw-alias-brand-primary)",
				background: "var(--dsw-alias-interactive-bg-hover)"
			},
			cardLabel: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				lineHeight: "16px",
				whiteSpace: "nowrap"
			},
			cardLabelSelected: {
				color: "var(--dsw-alias-label-primary)"
			},
			swatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				padding: "8px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				gap: "6px"
			},
			swatchLine: {
				height: "7px",
				borderRadius: "4px"
			},
			defaultSwatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				display: "flex",
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)"
			},
			updateRow: {
				display: "flex",
				alignItems: "center",
				flexWrap: "wrap",
				gap: "8px",
				marginTop: "4px"
			},
			updateButton: {
				background: "var(--dsw-alias-button-floating-fill)",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "8px",
				color: "var(--dsw-alias-label-primary)",
				cursor: "pointer",
				font: "inherit",
				fontSize: "12px",
				lineHeight: "18px",
				padding: "3px 10px"
			},
			updateDetail: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			updateCommand: {
				background: "var(--dsw-alias-markdown-code-block)",
				borderRadius: "6px",
				color: "var(--dsw-alias-label-primary)",
				fontFamily: "var(--ds-font-family-code)",
				fontSize: "11px",
				padding: "2px 8px",
				wordBreak: "break-all"
			}
		};

		/** Mini palette preview driven by one theme's token table. */
		function ThemeSwatch({ tokens }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: {
					...styles.swatch,
					background: tokens["--dsw-alias-bg-layer-1"],
					border: "1px solid " + tokens["--dsw-alias-border-l2"]
				},
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "70%",
							background: tokens["--dsw-alias-label-primary"],
							opacity: 0.85
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "45%",
							background: tokens["--dsw-alias-brand-primary"]
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "55%",
							background: tokens["--dsw-alias-label-secondary"],
							opacity: 0.55
						}
					})
				]
			});
		}

		/** "Default" chip: follow the built-in appearance (light + dark halves). */
		function DefaultSwatch() {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.defaultSwatch,
				children: [
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#f4f4f5" } }),
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#1c1c20" } })
				]
			});
		}

		/** One selectable theme card. */
		function ThemeCard({ theme, selected, onSelect, t }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onSelect,
				"aria-pressed": selected,
				style: {
					...styles.card,
					...(selected ? styles.cardSelected : {})
				},
				children: [
					(0, react_jsx_runtime.jsx)(ThemeSwatch, { tokens: theme.tokens }),
					(0, react_jsx_runtime.jsx)("span", {
						style: {
							...styles.cardLabel,
							...(selected ? styles.cardLabelSelected : {})
						},
						children: t("theme." + theme.id)
					})
				]
			});
		}

		/**
		 * Update-check row: silently checks once when the settings row
		 * mounts (host /solarized/check-update route, npm registry, 5-min
		 * cache), showing current/latest versions and the copyable upgrade
		 * command when a newer release exists — plus a manual "check for
		 * updates" button. The mount check renders nothing until the result
		 * lands, so opening Settings never flickers.
		 */
		function UpdateRow({ t }) {
			const [state, setState] = _react.useState({ idle: true });
			const check = (fromClick) => {
				if (fromClick) setState({ loading: true });
				fetch("/solarized/check-update")
					.then((response) => (response.ok ? response.json() : Promise.reject(new Error("HTTP " + response.status))))
					.then((payload) => setState(payload))
					.catch((error) => setState({ error: error instanceof Error ? error.message : String(error) }));
			};
			_react.useEffect(() => {
				check(false);
			}, []);
			let detail = null;
			if (state.loading) detail = t("theme.updating");
			else if (state.error) detail = t("theme.updateError") + " (" + state.error + ")";
			else if (state.ok === false) detail = t("theme.updateError") + " (" + (state.error ?? "") + ")";
			else if (state.upToDate) detail = t("theme.updateUpToDate") + " · " + t("theme.updateCurrent") + " " + state.current;
			else if (state.latest) detail = t("theme.updateCurrent") + " " + state.current + " → " + t("theme.updateLatest") + " " + state.latest;
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.updateRow,
				children: [
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => check(true),
						style: styles.updateButton,
						children: t("theme.checkUpdate")
					}),
					detail !== null ? (0, react_jsx_runtime.jsx)("span", {
						style: styles.updateDetail,
						children: detail
					}) : null,
					state.ok === true && state.upToDate === false && state.latest ? (0, react_jsx_runtime.jsx)("code", {
						style: styles.updateCommand,
						children: state.command
					}) : null
				]
			});
		}

		/**
		 * Theme picker row registered into the Settings → General item slot,
		 * right after the built-in Appearance row: title + a "Default" chip and
		 * one swatch card per curated theme.
		 */
		function ThemeRow({ t, setTheme, useStore }) {
			const theme = useStore((s) => s.theme);
			const selected = THEMES.some((candidate) => candidate.id === theme) ? theme : null;
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("theme.title")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.grid,
						children: [
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTheme(DEFAULT_THEME),
								"aria-pressed": selected === null,
								style: {
									...styles.card,
									...(selected === null ? styles.cardSelected : {})
								},
								children: [
									(0, react_jsx_runtime.jsx)(DefaultSwatch, {}),
									(0, react_jsx_runtime.jsx)("span", {
										style: {
											...styles.cardLabel,
											...(selected === null ? styles.cardLabelSelected : {})
										},
										children: t("theme.default")
									})
								]
							}),
							THEMES.map((themeDefinition) => (0, react_jsx_runtime.jsx)(ThemeCard, {
								theme: themeDefinition,
								selected: selected === themeDefinition.id,
								onSelect: () => setTheme(themeDefinition.id),
								t
							}, themeDefinition.id))
						]
					}),
					(0, react_jsx_runtime.jsx)(UpdateRow, { t })
				]
			});
		}
		//#endregion

		//#region @yuquexianzhou/solarized-dsh-theme: client plugin body
		/**
		 * Required services: theme runtime (registration and switching), the
		 * settings slot and locale (the picker row). Persistence is
		 * localStorage, so no settings transport is needed.
		 */
		const inject = [
			"slots",
			"locale",
			"theme"
		];

		/**
		 * Client plugin body: register the four themes into the theme runtime,
		 * restore the saved theme, keep the row store in sync with
		 * theme/change, and register the picker row into Settings → General.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
			const disposers = THEMES.map((themeDefinition) => ctx.theme.register(themeDefinition));
			ctx.effect(() => () => {
				for (const dispose of disposers) dispose();
			}, "@yuquexianzhou/solarized-dsh-theme: theme registration");

			// Component-level color accents, mirroring dsh-catppuccin: user
			// bubble tint, composer + button, tool call labels, timestamps,
			// sidebar hovers, homepage gradient and more. Selectors are
			// boosted with :not(#dsh-solarized) to out-rank the shipped
			// ui-* sheets (injected after ours at equal specificity), and
			// the whole sheet mounts only while one of our themes is
			// active — the Default preference stays pixel-identical.
			const boost = (selector) =>
				selector.split(",").map((part) => \`\${part.trim()}:not(#dsh-solarized)\`).join(",");
			const SURFACE_RULES = [
				[
					'[class$="_userStack"] [class$="_bubble"]',
					'  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 40%, var(--dsw-alias-bg-layer-2));'
				],
				// light flavors (solarized-light / selenized-light) tint at
				// 30%: the pale surface makes 40% look stronger
				[
					'body:not([data-ds-dark-theme]) [class$="_userStack"] [class$="_bubble"]',
					'  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, var(--dsw-alias-bg-layer-2));'
				],
				[
					'button[class$="_add"][aria-haspopup="listbox"]',
					'  color: var(--dsw-slz-sky);'
				],
				[
					'[class$="_refChip"]',
					'  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent);'
				],
				[
					'[class$="_thinkBody"]',
					'  color: color-mix(in srgb, var(--dsw-slz-peach) 72%, var(--dsw-alias-label-tertiary));'
				],
				[
					'[class$="_QWLzlG_title"]',
					'  color: var(--dsw-slz-peach);'
				],
				[
					'[class$="_o3BgMG_title"]',
					'  color: var(--dsw-slz-sky);'
				],
				[
					'[class$="_infostring"]',
					'  color: var(--dsw-slz-peach);'
				],
				[
					'[class$="_timeStart"]',
					'  color: var(--dsw-slz-lavender);'
				],
				[
					'[class$="o3BgMG_summary"]',
					'  color: color-mix(in srgb, var(--dsw-slz-sky) 55%, var(--dsw-alias-label-tertiary));'
				],
				[
					'[class$="QWLzlG_summary"]',
					'  color: color-mix(in srgb, var(--dsw-slz-peach) 55%, var(--dsw-alias-label-tertiary));'
				],
				[
					'[class$="_title_9cl6j_64"]:not([class$="QWLzlG_title"]):not([class$="o3BgMG_title"])',
					'  color: var(--dsw-slz-blue);'
				],
				[
					'[class*="_copyButton"]:hover',
					'  color: var(--dsw-alias-brand-primary);'
				],
				[
					'[class$="p-xYUq_actions"] button:hover, [class$="Sxvs8a_actions"] button:hover, [class$="_7yHdaG_actions"] button:hover, [class$="osXY9a_actions"] button:hover',
					'  color: var(--dsw-alias-brand-primary);'
				],
				[
					'[class$="YDXeBa_selected"] [class$="YDXeBa_title"]',
					'  color: var(--dsw-alias-brand-primary);'
				],
				[
					'[class$="YDXeBa_title"]:hover',
					'  color: var(--dsw-alias-brand-primary);'
				],
				[
					'[class$="YDXeBa_time"]',
					'  color: var(--dsw-slz-lavender);'
				],
				[
					'[class~="hHd-Xa_newSessionLabel"]:hover',
					'  color: var(--dsw-alias-brand-primary);'
				],
				[
					'[class~="hHd-Xa_iconButton"]:hover, [class~="qDHVXG_iconButton"]:hover, [class~="qDHVXG_searchButton"]:hover, [class~="YDXeBa_iconButton"]:hover',
					'  color: var(--dsw-alias-brand-primary);'
				],
				[
					'[class~="VOzbGW_trigger"]:hover',
					'  color: var(--dsw-alias-brand-primary);'
				],
				[
					'[class$="wSkVaW_crumbCurrent"]',
					'  color: var(--dsw-alias-brand-primary);'
				],
				[
					'[class$="pXSMma_headlineText"]',
					[
						'  background: linear-gradient(90deg, var(--dsw-slz-peach), var(--dsw-slz-sky), var(--dsw-alias-brand-primary));',
						'  -webkit-background-clip: text;',
						'  background-clip: text;',
						'  -webkit-text-fill-color: transparent;',
						'  color: transparent;'
					].join('\\n')
				],
				[
					'[class$="pXSMma_workspaceLabel"]',
					'  color: var(--dsw-slz-lavender);'
				],
				[
					'[class$="pXSMma_previewBadge"]',
					'  color: var(--dsw-alias-state-warn-label);'
				],
				[
					'[class$="_7KE1Ra_triggerEffort"]',
					'  color: var(--dsw-slz-lavender);'
				],
				[
					'[class$="Sh0Q9G_triggerLabel"]:hover, [class$="_7KE1Ra_triggerLabel"]:hover',
					'  color: var(--dsw-alias-brand-primary);'
				],
				[
					'[class$="_7KE1Ra_option"]:hover:not(:disabled), [class$="mufS8W_row"]:hover',
					'  color: var(--dsw-alias-brand-primary);'
				],
				[
					'[class$="uV2eYG_card"]:hover',
					'  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent);'
				],
				[
					'[class$="uV2eYG_primary"]:hover',
					'  filter: brightness(1.08);'
				],
				[
					'[class$="uV2eYG_primary"]:is([aria-label="停止"],[aria-label="Stop"])',
					[
						'  background: var(--dsw-alias-state-error-primary);',
						'  filter: none;'
					].join('\\n')
				]
			].map(([selector, body]) => \`\${boost(selector)} {\\n\${body}\\n}\`).join("\\n");
			const style = document.createElement("style");
			style.textContent = SURFACE_RULES;
			const syncSurfaceTint = () => {
				const active = THEMES.some((themeDefinition) => themeDefinition.id === ctx.theme.getTheme().preference);
				if (active && !style.isConnected) document.head.appendChild(style);
				if (!active && style.isConnected) style.remove();
			};
			syncSurfaceTint();
			ctx.on("theme/change", syncSurfaceTint);
			ctx.effect(() => () => {
				style.remove();
			}, "@yuquexianzhou/solarized-dsh-theme: surface tint lifecycle");

			// Restore the saved theme. The ThemeService adopts its durable
			// built-in preference from the Host settings scope asynchronously
			// after boot, and re-adopts it on every settings-document reload
			// — switching a model rewrites the settings doc and clobbers our
			// third-party preference back to the document's value ("system"
			// when never written, or a persisted light/dark). So instead of
			// a one-shot boot window, defend on every theme/change.
			//
			// The one seam that tells "the user clicked light/dark in the
			// Appearance row THIS session" apart from "adopt() copied the
			// settings document at boot/reload" is the setTheme wrapper:
			// adopt() writes the runtime preference directly and never goes
			// through setTheme. A built-in preference only wins while it
			// matches a live explicit pick; values adopted from the document
			// (livePick null) are stale for us — the theme row choice is
			// newer than the document's light/dark — so the theme is
			// re-applied then. Picking a theme clears the record.
			let liveBuiltinPick = null;
			const originalSetTheme = ctx.theme.setTheme;
			ctx.theme.setTheme = (id) => {
				liveBuiltinPick = id === "light" || id === "dark" || id === DEFAULT_THEME ? id : null;
				originalSetTheme.call(ctx.theme, id);
			};
			const reassertSaved = () => {
				const current = ctx.theme.getTheme().preference;
				if ((current === "light" || current === "dark") && current === liveBuiltinPick) return;
				const latest = readSavedTheme();
				if (typeof latest === "string" && latest !== DEFAULT_THEME && THEMES.some((themeDefinition) => themeDefinition.id === latest)) {
					ctx.theme.setTheme(latest);
				}
			};
			reassertSaved();

			// Durable two-layer persistence: localStorage is the instant
			// layer, the host's solarized-state.json (under $DSH_HOME)
			// survives Desktop's per-launch port churn where localStorage
			// always starts empty. Hydrate once at boot when localStorage
			// has no choice, then debounce-flush every change to the file.
			const STATE_ROUTE = "/solarized/state";
			let stateTimer = null;
			const flushState = () => {
				const saved = readSavedTheme();
				fetch(STATE_ROUTE, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ version: 1, theme: saved })
				}).catch(() => {
					// best-effort; localStorage still holds the choice
				});
			};
			const scheduleFlush = () => {
				if (stateTimer !== null) clearTimeout(stateTimer);
				stateTimer = setTimeout(() => {
					stateTimer = null;
					flushState();
				}, 300);
			};
			const hydrateFromFile = async () => {
				if (readSavedTheme() !== null) return;
				try {
					const response = await fetch(STATE_ROUTE);
					if (!response.ok) return;
					const state = await response.json();
					const theme = state && typeof state.theme === "string" && THEMES.some((themeDefinition) => themeDefinition.id === state.theme) ? state.theme : null;
					if (theme !== null) {
						writeSavedTheme(theme);
						if (ctx.theme.getTheme().preference === DEFAULT_THEME) ctx.theme.setTheme(theme);
					}
				} catch {
					// route absent (older host) — localStorage-only mode
				}
			};
			hydrateFromFile();

			const themeStore = createThemeStore();
			let themeBound;
			const syncTheme = (snapshot) => {
				themeBound?.sync(snapshot.preference, snapshot.revision);
			};
			ctx.on("theme/change", (snapshot) => {
				syncTheme(snapshot);
				const pref = snapshot.preference;
				// Record the built-in preference on every non-theme
				// observation (boot, adopt() reloads, explicit Appearance
				// changes) BEFORE any re-assert, so turning the theme off
				// can hand the user back exactly what they had.
				rememberBuiltinPreference(pref);
				// If the preference moved to another plugin's third-party theme,
				// drop our stored choice so only the last-picked plugin restores
				// at boot (both plugins must implement this convention).
				if (pref !== DEFAULT_THEME && pref !== "light" && pref !== "dark" && !THEMES.some((themeDefinition) => themeDefinition.id === pref)) {
					writeSavedTheme(DEFAULT_THEME);
				}
				// Re-assert from a fresh task: a re-entrant setTheme inside the
				// dispatch is missed by other subscribers (ui-layout's
				// ThemePresenter), so the restored theme would never reach the DOM.
				scheduleFlush();
				setTimeout(() => {
					reassertSaved();
				}, 0);
			});

			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "@yuquexianzhou/solarized-dsh-theme: settings row dictionaries");

			const themeInjected = (actions) => {
				themeBound = actions;
				syncTheme(ctx.theme.getTheme());
				return {
					setTheme: (id) => {
						// persist first: setTheme publishes a synchronous
						// theme/change, so the re-assert handler must already
						// see the new saved value (otherwise toggling back to
						// the default re-applies the old theme)
						writeSavedTheme(id);
						// turning the theme off restores the user's last
						// built-in preference instead of forcing "system"
						ctx.theme.setTheme(id === DEFAULT_THEME ? readRestoredPreference() : id);
						scheduleFlush();
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "solarized",
				order: 20,
				store: themeStore,
				locale: SETTINGS_NS,
				inject: themeInjected
			}, ThemeRow));

			ctx.effect(() => () => {
				if (stateTimer !== null) clearTimeout(stateTimer);
				// undo the setTheme wrapper so a stopped plugin leaves the
				// runtime as it found it
				ctx.theme.setTheme = originalSetTheme;
			}, "@yuquexianzhou/solarized-dsh-theme: state flush timer");
		}
		//#endregion

		exports.SETTINGS_NS = SETTINGS_NS;
		exports.THEMES = THEMES;
		exports.DEFAULT_THEME = DEFAULT_THEME;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
`;

writeFileSync(join(root, "lib/client.js"), CLIENT_TEMPLATE.replace("__TOKENS__", tokensBlock()));
console.log("wrote lib/client.js");
