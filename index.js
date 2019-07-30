const config = require('./config')
const mongoose = require('mongoose')
const app = require('./app')


mongoose.connect(process.env.urlDB, (err, res) =>{
    if(err){
        return console.log(`No can't connect to database`);
    }
    app.listen(process.env.PORT, ()=>{
        console.log('Server listen in port: ' + process.env.PORT);
    })
})
