const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('TB_CARDS_ABILITY', {
    card_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    idol_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ability_backmember: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ability_effect: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ability_scope: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ability_strength: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ability_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    db_backmember: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    db_effect: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    db_scope: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    db_strength: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    db_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ability_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TB_CARDS_ABILITY',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "TB_CARDS_ABILITY_pkey",
        unique: true,
        fields: [
          { name: "card_hash" },
        ]
      },
    ]
  });
};
