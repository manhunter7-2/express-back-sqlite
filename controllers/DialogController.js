const Dialog = require("../models/Dialog");

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
    }
}
module.exports = DialogController