const requiredRules = require('./rules/eslint/required');
const recommendedRules = require('./rules/eslint/recommended');
const optionalRules = require('./rules/eslint/optional');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'import'],
  rules: {
    ...requiredRules,
    ...recommendedRules,
    ...optionalRules,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}; 