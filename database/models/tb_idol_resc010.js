const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_idol_resc010', {
    idol_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    idol_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "tb_idol_resc010_idol_name_key"
    },
    created_timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_idol_resc010',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_idol_resc010_idol_name_key",
        unique: true,
        fields: [
          { name: "idol_name" },
        ]
      },
      {
        name: "tb_idol_resc010_pkey",
        unique: true,
        fields: [
          { name: "idol_id" },
        ]
      },
    ]
  });
};
