const requiredRules = require('./rules/prettier/required');
const recommendedRules = require('./rules/prettier/recommended');
const optionalRules = require('./rules/prettier/optional');

module.exports = {
  ...requiredRules,
  ...recommendedRules,
  ...optionalRules,
}; 