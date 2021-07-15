const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('TB_MASTER_CODE', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Sequelize.literal("nextval('master_code_id')"),
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cd_v: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cd_v_meaning: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cd_v_meaning_trans: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_MASTER_CODE',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "TB_MASTER_CODE_pkey",
        unique: true,
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
};
