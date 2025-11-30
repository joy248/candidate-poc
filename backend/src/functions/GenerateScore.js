module.exports = async function(context, req) {
  // forward to the implementation under ../GenerateScore/index.js
  const impl = require('../../GenerateScore/index.js');
  return impl(context, req);
};
