
const { getDefaultConfig } = require('@expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

const blacklist = require('metro-config/src/defaults/blacklist');


module.exports = (async () => {

   return {
      resolver: {
         blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
      },
   };
})();

