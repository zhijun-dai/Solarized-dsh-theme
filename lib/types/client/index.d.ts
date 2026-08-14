/**
 * dsh-Solarized client half types: the curated themes, the settings row, and
 * the client plugin body.
 */
import type { Context } from "@deepseek-ai/cordis";
import type { ThemeDefinition } from "@deepseek-ai/dsh-client-ui-theme/client";

/** The four selectable themes (registered third-party themes). */
export declare const THEMES: readonly ThemeDefinition[];

/** The settings row's locale namespace. */
export declare const SETTINGS_NS: "settings.solarized";

/** Sentinel meaning "no custom theme". */
export declare const DEFAULT_THEME: "system";

/** Required services (cordis fiber inject). */
export declare const inject: string[];

/** Client plugin body: register themes, restore the saved theme, mount the picker row. */
export declare function apply(ctx: Context): void;
