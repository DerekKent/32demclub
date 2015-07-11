System.config({
  "baseURL": "/",
  "defaultJSExtensions": true,
  "transpiler": "none",
  "paths": {
    "~/*": "scripts/*.js",
    "github:*": "../jspm_packages/github/*",
    "npm:*": "../jspm_packages/npm/*"
  }
});

System.config({
  "map": {
    "backbone": "npm:backbone@1.2.1",
    "backbone.nativeview": "github:akre54/Backbone.NativeView@0.3.3",
    "handlebars": "github:components/handlebars.js@3.0.3",
    "underscore": "npm:underscore@1.8.3",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:backbone@1.2.1": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "underscore": "npm:underscore@1.8.3"
    }
  }
});
