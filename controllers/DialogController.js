const Dialog = require("../models/Dialog");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db/database.sqlite'
})

const DialogController = {
    home: (req, res) => {
        res.status(200).json({
            message:"Welcome"
        })
    },
    add: (req, res, next) => {
        const dialog = Dialog.build({
            question: req.body.question,
            answer: req.body.answer,
            date: new Date()
        });
        (async function save(){
            await dialog.save();
            console.log(dialog);
            console.log("Success");
        })()
        res.status(200).json({
            message: "Success !"
        })
    },
    getAll: async(req, res) =>{
        const all = await Dialog.findAll();
        res.status(200).json({
            data: all
        })
    },
    delete: async(req, res) =>{
        await Dialog.destroy({where: {id: req.id}});
        console.log("Deleted !");
    }
}
module.exports = DialogController