// This file intercepts require calls to prevent SWC from loading
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  if (id.includes('@next/swc')) {
    return {};
  }
  return originalRequire.apply(this, arguments);
};

require('next/dist/bin/next');
