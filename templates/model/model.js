var Manager = require("app/models/manager")

Manager.registerModels(<%= JSON.stringify(models, null, 4) %>)

module.exports = Manager