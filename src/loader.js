'use strict';


var utils = require('loader-utils');
var modules = {};


module.exports = function(content) {
  this.cacheable && this.cacheable();

  var options = utils.parseQuery(this.query);

  if (!options.id) {
    throw new ReferenceError('LoaderModules plugin id is undefined');
  }

  if (!modules[options.id]) {
    modules[options.id] = [];
  }

  modules[options.id].push(this._module);

  return content;
};


module.exports.getPluginModules = function(pluginId) {
  return modules[pluginId];
};
