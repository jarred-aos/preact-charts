module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react"
  ],
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "settings": {
    "react": {"pragma": "h"}
  },
  "parserOptions": {
    "project": "./javascript/tsconfig.json",
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module",
    "ecmaVersion": "8"
  },
  "env": {
    "browser": true,
    "es6": true,
    "node":  true,
  },
  "rules": {
    "linebreak-style": "off",
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "eol-last": ["error", "always"],
    "max-len": ["warn", {"code": 120, "ignoreComments": true}],
    "one-var": ["error", "never"],
    "no-var": "error",
    "no-console": "warn",
    "no-trailing-spaces": "warn",
    "eqeqeq": ["error", "always"],
    "yoda": "error",
    "jsx-quotes": ["error", "prefer-single"],
    "comma-spacing": ["error", {"before": false, "after": true}],
    "keyword-spacing": ["error", {"before": true, "after": true}],
    "semi-style": ["error", "last"],
    "space-before-function-paren": ["error", "always"],
    "template-tag-spacing": ["error", "never"],
    "object-curly-spacing": ["warn", "always"],
    'react/jsx-uses-react': 2,
    'react/jsx-pascal-case': 2,
		'react/jsx-tag-spacing': [2, { beforeSelfClosing: 'always' }],
    "react/no-unknown-property": [1, {ignore: ["class", "autofocus"]}],
    "react/no-deprecated": "off",
    "react/jsx-key": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/indent": ["warn", 2, {SwitchCase: 1}]
  },
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off",
      }
    }
  ]
};
