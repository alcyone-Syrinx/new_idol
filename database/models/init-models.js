var DataTypes = require("sequelize").DataTypes;
var _tb_idol_resc010 = require("./tb_idol_resc010");

function initModels(sequelize) {
  var tb_idol_resc010 = _tb_idol_resc010(sequelize, DataTypes);


  return {
    tb_idol_resc010,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
