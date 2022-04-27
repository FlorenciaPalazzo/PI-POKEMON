const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('type', {

    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
  
    },

    nombre: {
        type: DataTypes.STRING,
      },

  });
};