const { DataTypes, Sequelize } = require('sequelize');
// const { toDefaultValue } = require('sequelize/types/utils');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tipo', {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
    },
  } , {
    timestamps: false,
    freezeTableName : true
  });
};
