/* eslint-disable @typescript-eslint/ban-ts-comment */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
// @ts-ignore
export default [
	{
		rules: {
			"no-unused-vars": "error",
		},
	},
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
