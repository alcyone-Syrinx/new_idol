const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_IDOLS_CARDS', {
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
    card_atk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    card_def: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    card_rare: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    card_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    card_seq: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_IDOLS_CARDS',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "TB_IDOLS_CARDS_pkey",
        unique: true,
        fields: [
          { name: "card_hash" },
        ]
      },
    ]
  });
};
