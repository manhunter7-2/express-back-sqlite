const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db/database.sqlite'
})

const Dialog = sequelize.define('Dialog', {
    question:{
        type: DataTypes.STRING,
        allowNull: false
    },
    answer:{
        type: DataTypes.STRING,
        allowNull: false
    },
    date:{
        type:DataTypes.DATE,
        allowNull: true
    }
});

(async function sync(){
    await Dialog.sync({force: false});
})()
module.exports=Dialog