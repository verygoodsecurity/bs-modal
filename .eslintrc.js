module.exports = {
  "extends": ["eslint:recommended", "google"],
  "parser": "babel-eslint",

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },

  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },

  "rules": {
    "arrow-spacing": "warn",
    "brace-style": "off",
    "camelcase": "off",
    "comma-dangle": ["error", "only-multiline"],
    "default-case": "off",
    "key-spacing": "off",
    "max-len": "off",
    "max-nested-callbacks": ["error", 5],
    "max-statements-per-line": "off",
    "new-cap": "off",
    "no-console": "off",
    "no-duplicate-imports": "warn",
    "no-multi-spaces": "off",
    "no-var": "warn",
    "no-invalid-this": "off",
    "object-curly-spacing": "off",
    "object-shorthand": "warn",
    "one-var": "off",
    "quote-props": "off",
    "require-jsdoc": "off",
  }
};
