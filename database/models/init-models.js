var DataTypes = require("sequelize").DataTypes;
var _TB_CARDS_ABILITY = require("./TB_CARDS_ABILITY");
var _TB_IDOLS = require("./TB_IDOLS");
var _TB_IDOLS_CARDS = require("./TB_IDOLS_CARDS");
var _TB_IDOLS_SCRIPTS = require("./TB_IDOLS_SCRIPTS");
var _TB_IDOLS_TRANSLATIONS = require("./TB_IDOLS_TRANSLATIONS");
var _TB_MASTER_CODE = require("./TB_MASTER_CODE");

function initModels(sequelize) {
  var TB_CARDS_ABILITY = _TB_CARDS_ABILITY(sequelize, DataTypes);
  var TB_IDOLS = _TB_IDOLS(sequelize, DataTypes);
  var TB_IDOLS_CARDS = _TB_IDOLS_CARDS(sequelize, DataTypes);
  var TB_IDOLS_SCRIPTS = _TB_IDOLS_SCRIPTS(sequelize, DataTypes);
  var TB_IDOLS_TRANSLATIONS = _TB_IDOLS_TRANSLATIONS(sequelize, DataTypes);
  var TB_MASTER_CODE = _TB_MASTER_CODE(sequelize, DataTypes);

  TB_IDOLS_CARDS.belongsTo(TB_IDOLS, { as: "idol", foreignKey: "idol_id"});
  TB_IDOLS.hasMany(TB_IDOLS_CARDS, { as: "TB_IDOLS_CARDs", foreignKey: "idol_id"});
  TB_IDOLS_SCRIPTS.belongsTo(TB_IDOLS, { as: "idol", foreignKey: "idol_id"});
  TB_IDOLS.hasMany(TB_IDOLS_SCRIPTS, { as: "TB_IDOLS_SCRIPTs", foreignKey: "idol_id"});

  return {
    TB_CARDS_ABILITY,
    TB_IDOLS,
    TB_IDOLS_CARDS,
    TB_IDOLS_SCRIPTS,
    TB_IDOLS_TRANSLATIONS,
    TB_MASTER_CODE,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
