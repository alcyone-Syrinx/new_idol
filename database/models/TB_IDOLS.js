const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_IDOLS', {
    idol_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    idol_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "tb_idols_idol_name_unique"
    },
    idol_age: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    idol_home: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idol_type: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_IDOLS',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "TB_IDOLS_pkey",
        unique: true,
        fields: [
          { name: "idol_id" },
        ]
      },
      {
        name: "tb_idols_idol_name_unique",
        unique: true,
        fields: [
          { name: "idol_name" },
        ]
      },
    ]
  });
};
