'use strict';


var loader = require('./loader');
var id = 0;


function LoaderModulesPluginFactory() {
  var LoaderModulesPlugin = function LoaderModulesPlugin() {
    return new PluckPluginFactory();
  };

  LoaderModulesPlugin.id = ++id;
  LoaderModulesPlugin.loader = makeLoaderString;
  LoaderModulesPlugin.get = getModules;

  return LoaderModulesPlugin;
}

module.exports = LoaderModulesPluginFactory;


function getModules() {
  return loader.getPluginModules(this.id);
}


function makeLoaderString(loaders) {
  var pluginLoader = require.resolve('./loader') + '?id=' + this.id;

  if (!loaders) {
    return pluginLoader;
  } else if (Array.isArray(loaders)) {
    return pluginLoader + '!' + loaders.join('!');
  } else if (typeof loaders === 'string') {
    return pluginLoader + '!' + loaders;
  }
}
