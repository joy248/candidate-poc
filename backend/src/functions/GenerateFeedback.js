module.exports = async function(context, req) {
  // forward to the implementation under ../GenerateFeedback/index.js
  const impl = require('../../GenerateFeedback/index.js');
  return impl(context, req);
};
