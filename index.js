/**
 * Provides current Request Url into view engine as new property
 * 
 * @param {String} pathPropName Custom name for current url in template
 */
module.exports = function(pathPropName) {
  // If special name didn't specified — use default one
  if (!pathPropName || typeof pathPropName !== 'string') {
    pathPropName = 'path';
  }
  return function(req, res, next) {
    var renderMethod = res.render;
    res.render = function() {
      var args = [].slice.apply(arguments);
      // If properties object provided in render call
      if (args[1] && typeof args[1] === 'object') {
        const templateVariables = args[1];
        // Check if we didnt override user property first
        if (typeof templateVariables[pathPropName] === 'undefined') {
          // Add original property with request URL to template vars
          templateVariables[pathPropName] = req.originalUrl || req.url;
        }
      }
      return renderMethod.apply(res, arguments);
    }
    next();
  };
};
