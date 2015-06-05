System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "~/*": "scripts/*.js",
    "github:*": "../jspm_packages/github/*.js",
    "npm:*": "../jspm_packages/npm/*.js"
  }
});

System.config({
  "depCache": {
    "~/helpers/backbone/base": [
      "npm:underscore@1.8.3",
      "npm:backbone@1.2.0"
    ],
    "npm:underscore@1.8.3": [
      "npm:underscore@1.8.3/underscore"
    ],
    "npm:process@0.10.1": [
      "npm:process@0.10.1/browser"
    ],
    "github:components/handlebars.js@3.0.3": [
      "github:components/handlebars.js@3.0.3/handlebars"
    ],
    "github:jspm/nodelibs-process@0.1.1/index": [
      "npm:process@0.10.1"
    ],
    "~/app/app.hbs": [
      "github:components/handlebars.js@3.0.3"
    ],
    "github:jspm/nodelibs-process@0.1.1": [
      "github:jspm/nodelibs-process@0.1.1/index"
    ],
    "~/app/app": [
      "npm:backbone@1.2.0",
      "~/helpers/backbone/base",
      "~/app/app.hbs"
    ],
    "npm:backbone@1.2.0/backbone": [
      "npm:underscore@1.8.3",
      "github:jspm/nodelibs-process@0.1.1"
    ],
    "~/router": [
      "npm:backbone@1.2.0",
      "~/app/app"
    ],
    "npm:backbone@1.2.0": [
      "npm:backbone@1.2.0/backbone"
    ],
    "scripts/main": [
      "npm:backbone@1.2.0",
      "~/router",
      "~/app/app"
    ]
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.4.3",
    "babel-runtime": "npm:babel-runtime@5.4.3",
    "backbone": "npm:backbone@1.2.0",
    "backbone.nativeview": "github:akre54/Backbone.NativeView@0.3.3",
    "core-js": "npm:core-js@0.9.11",
    "handlebars": "github:components/handlebars.js@3.0.3",
    "underscore": "npm:underscore@1.8.3",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:backbone@1.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "underscore": "npm:underscore@1.8.3"
    },
    "npm:core-js@0.9.11": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

