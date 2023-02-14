const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    released:{ 
      type: DataTypes.STRING,
    },
    background_image: {
      type: DataTypes.STRING
    },
    rating:{
      type: DataTypes.INTEGER
    },
    plataformas:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    genero:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
   

  },{
    timestamps: false
});
};



 // genresDB:{
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }