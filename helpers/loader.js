'use strict';

// load deps
let fs = require('fs');
let path = require('path');
let inflected = require('inflection');

module.exports = (dir) => {
  let rootPath = path.join(__dirname, '/../', dir);
  let ret = [];
  fs.readdirSync(rootPath).forEach((file) => {
    if (!fs.statSync(rootPath + '/' + file).isFile() || !isLoadable(file) || file === 'index.js') {
      return;
    }

    ret.push({
      Klass: require(path.join(rootPath, file)),
      name: inflected.camelize(path.basename(file, '.js'))
    });
  });

  return ret;
};

/**
 *
 * Check if the file in target is loadable
 *
 */
function isLoadable (name) {
  return /\.(js|coffee|lf)$/.test(name);
}
