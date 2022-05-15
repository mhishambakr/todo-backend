const express = require('express');

const app = express();

const cors = require('cors')

const PORT = 5000;

const { sequelize } = require('./src/index')

sequelize.sync({ alter: true }).then().catch(err => console.log(err))

const routesV1 = require('./src/routes.v1');
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send(`<h1>App is running on port ${PORT}</h1>`);
})

routesV1(app, '/api');

app.listen(PORT, ()=>{
    console.log(`Todo app is running. Listening on port ${PORT}`);
})