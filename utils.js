const semver = require('semver')

const checkNodeVersion = () => {
  return semver.gte(process.version, '10.5.0')
}

module.exports = {
  checkNodeVersion
}
