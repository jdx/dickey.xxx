var config = require('./config')

if (config.assets.rev) {
  var rev = require('../assets/rev-manifest.json')
}

// Return the matching asset for a given base name
// Similar to sprockets
module.exports = function (base) {
  if (config.assets.rev) { base = rev[base] }
  base = '/' + base
  if (config.assets.host) { return config.assets.host + base }
  else { return base }
}
