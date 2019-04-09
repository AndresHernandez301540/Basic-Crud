// Express
const express = require('express');
const mongoose=require('mongoose');
const http=require('http');
const app=express();
// Import Routes
const userRoutes=require('./Routes/userRoutes');



// Mongoose
app.set('port',3000);
const server = http.createServer(app);
const uri = 'mongodb://localhost:27017/BasicCrud';
// Mongo connection
mongoose.Promise=global.Promise;
mongoose.connect(uri,{useNewUrlParser:true}).then(()=>{
    server.listen(3000,()=>{
        console.log('Successful Connection');
    });
}).catch(err=>{
    console.log("Can't established a successful connection");
})



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

// Routes
app.use('/users',userRoutes);
app.get('/',(req,res)=>{
    res.send('Hello');
});

module.exports=app;