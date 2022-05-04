const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {

    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    

    vida:{
      type:DataTypes.INTEGER
    },

    fuerza:{
      type:DataTypes.INTEGER 
    },

    defensa:{
      type:DataTypes.INTEGER 
    },

    velocidad:{
      type:DataTypes.INTEGER 
    },

    altura: {
      type:DataTypes.INTEGER 
    },

    peso: {
      type:DataTypes.INTEGER 
    },

    img: {
      type: DataTypes.STRING,
    }
    

  });
};

