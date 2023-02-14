const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('plataform', {
        
        name: { 
            type: DataTypes.STRING,
            allowNull: false
        },
       idApi: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },{
        timestamps: false
    } ) }