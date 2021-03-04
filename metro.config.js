const blacklist = require('metro-config/src/defaults/blacklist');
console.log(" configfile ", new Error().stack);
module.exports = {
  resolver: {
    blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
  },
  transformer: {
    getTransformOptions: async () => ({
     transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};