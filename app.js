const express = require('express')
const app = express()
const {Sequelize} = require("sequelize")
// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Dialog API',
        description: 'Dialog API Information',
        contact: {
          name: 'Developer Name',
        },
        servers: ['http://localhost:3000'],
      },
    },
    apis: ['./routes/routes.js'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const Dialog=require("./models/Dialog")

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message:"Welcome"
    })
})

app.get('/allchats', async (req, res) =>{
    const all = await Dialog.findAll();

    res.status(200).json({
        data: all
    })
})

app.post('/create', (req, res) => {
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
})



const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
});
  
(async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()

app.listen(3000, () => {
    console.log('server is running on port 3000')
})