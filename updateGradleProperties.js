var CONFIG_PROPERTY = 'android.enableAapt2';
var CONFIG_LINE = CONFIG_PROPERTY + '=false';


module.exports = function(ctx) {
  var fs = ctx.requireCordovaModule('fs'),
      path = ctx.requireCordovaModule('path');

  var gradlePropertiesPath = path.join(ctx.opts.projectRoot, 'platforms/android/gradle.properties');

  // Read existing gradle.properties file, if it exists
  return new Promise(function(resolve, reject) {
    if (!fs.existsSync(gradlePropertiesPath)) {
      resolve();
    } else {
      fs.readFile(gradlePropertiesPath, function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    }
  })
  // Append option and write gradle.properties file
  .then(function(fileContents) {
    fileContents = fileContents && fileContents.toString() || '';

    if (fileContents.indexOf(`${CONFIG_PROPERTY}=`) !== -1) {
      // Update existing config value(s)
      fileContents = fileContents.replace(new RegExp(CONFIG_PROPERTY + '=\\w+', 'g'), CONFIG_LINE);
    } else {
      // Append config to file
      fileContents += '\n' + CONFIG_LINE;
    }

    return new Promise(function(resolve, reject) {
      fs.writeFile(gradlePropertiesPath, fileContents, function(err) {
        if (err) reject(err);
        else resolve();
      });
    })
  });
};
