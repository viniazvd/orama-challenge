const path = require('path')

function resolveSrc (_path) {
  return path.resolve(__dirname, _path)
}

const aliases = {
  '@utils': 'src/utils',
  '@assets': 'src/assets',
  '@mixins': 'src/mixins',
  '@containers': 'src/containers',
  '@components': 'src/components',
  '@components:common': 'src/components/common',
  '@icons': 'src/components/common/icons'
}

module.exports = {
  webpack: {}
}

for (const alias in aliases) {
  const aliasTo = aliases[alias]

  module.exports.webpack[alias] = resolveSrc(aliasTo)
}
