const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_IDOLS_TRANSLATIONS', {
    idol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    trans_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_IDOLS_TRANSLATIONS',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "TB_IDOLS_TRANSLATIONS_pkey",
        unique: true,
        fields: [
          { name: "idol_id" },
        ]
      },
    ]
  });
};
