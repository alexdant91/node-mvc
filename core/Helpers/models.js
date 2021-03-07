module.exports.getModelExcludeString = (modelName = null) => {
  if (modelName != null) {
    const { exclude } = require('../../app/Models/User');
    return exclude.length > 0 ? `-${exclude.join(' -')}` : null;
  } else {
    throw new Error("Model name required.");
  }
}

module.exports.getModelHashArray = (modelName = null) => {
  if (modelName != null) {
    const { hash } = require('../../app/Models/User');
    return hash;
  } else {
    throw new Error("Model name required.");
  }
}
