const { DataTypes} = require('sequelize');
// const { toDefaultValue } = require('sequelize/types/utils');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.INTEGER,
      defaultValue:25
    },
    ataque: {
      type: DataTypes.INTEGER,
      defaultValue:25
    },
    defensa: {
      type: DataTypes.INTEGER,
      defaultValue:25
    },
    velocidad: {
      type: DataTypes.INTEGER,
      defaultValue:25
    },
    ataque: {
      type: DataTypes.INTEGER,
      defaultValue:25
    },
    altura: {
      type: DataTypes.DECIMAL,
      defaultValue:25
    },
    peso: {
      type: DataTypes.DECIMAL,
      defaultValue:25
    },
    img: {
      type: DataTypes.STRING,
      defaultValue:25
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    
  } , {
    timestamps: false,
    freezeTableName : true,
    initialAutoIncrement: "41",

  });

};

