const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_IDOLS_SCRIPTS', {
    card_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    idol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TB_IDOLS',
        key: 'idol_id'
      }
    },
    script_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "tb_idols_scripts_script_id_unique"
    },
    card_script: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TB_IDOLS_SCRIPTS',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "TB_IDOLS_SCRIPTS_pkey",
        unique: true,
        fields: [
          { name: "card_hash" },
        ]
      },
      {
        name: "tb_idols_scripts_script_id_unique",
        unique: true,
        fields: [
          { name: "script_id" },
        ]
      },
    ]
  });
};
