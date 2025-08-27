import globals from 'globals';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import wordpressConfig from '@wordpress/scripts/config/.eslintrc.js';
import prettierConfig from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import { fixupConfigRules } from '@eslint/compat';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const compat = new FlatCompat( {
	baseDirectory: __dirname,
} );

export default defineConfig( [
	...fixupConfigRules( compat.config( wordpressConfig ) ),
	prettierConfig,
	{
		files: [ '**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx' ],
		languageOptions: { globals: globals.browser },
	},
	{
		files: [ '**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx' ],
		plugins: { js },
		extends: [ 'js/recommended' ],
	},
	{
		rules: {
			'no-console': 'warn',
		},
	},
	globalIgnores( [ 'dist/', 'vendor/', 'build/' ] ),
] );
