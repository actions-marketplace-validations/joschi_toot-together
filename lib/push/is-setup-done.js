module.exports = isSetupDone;

const fs = require("fs");
const { resolve: resolvePath } = require("path");

function isSetupDone() {
  const tootsFolderPath = resolvePath(process.env.GITHUB_WORKSPACE, "toots");
  return new Promise((resolve) => {
    fs.stat(tootsFolderPath, (error, stat) => {
      if (error) {
        return resolve(false);
      }

      resolve(stat.isDirectory());
    });
  });
}
