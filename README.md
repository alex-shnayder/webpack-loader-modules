# webpack-loader-modules

A [webpack](http://webpack.github.io/) plugin that allows you to retrieve the list of the modules processed by a loader.

## Install

`npm install -D webpack-loader-modules`

## Example

Here we use [compiler-webpack-plugin](https://github.com/elliottsj/compiler-webpack-plugin) to copy all the template modules to another chunk.

```javascript
var LoaderModules = require('webpack-loader-modules');
var CompilerPlugin = require('compiler-webpack-plugin');
var templateModules = new LoaderModules();

module.exports = {
  module: {
    loaders: [
      test: /\.jade$/,
      loader: templateModules.loader('html!jade')
    ]
  },
  plugins: [
    new CompilerPlugin('this-compilation', function(compilation) {
      compilation.plugin('optimize-chunks', function(chunks) {
        var templates = templateModules.get();

        templates.forEach(function(template) {
          template.addChunk(chunks[0]);
          chunks[0].addModule(template);
        });
      });
    });
  ]
};
```
