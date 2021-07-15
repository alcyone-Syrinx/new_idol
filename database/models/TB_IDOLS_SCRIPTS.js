const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('TB_IDOLS_SCRIPTS', {
    card_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
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
      primaryKey: true
    },
    card_script: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    trans_script: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    script_category: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    script_group: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_IDOLS_SCRIPTS',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "card_script_pk",
        unique: true,
        fields: [
          { name: "card_script", name: "script_id" },
        ]
      },
    ]
  });
};
