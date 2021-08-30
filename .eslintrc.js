module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		'editor.codeActionsOnSave': {
			'source.fixAll.eslint': true,
		},
		'eslint.validate': ['javascript'],
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
	},
}
