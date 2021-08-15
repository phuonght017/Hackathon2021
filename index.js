const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http')
const server = http.createServer(app)

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const dairyRoute = require('./routes/dairy.route') 



app.set("view engine", "ejs")
app.set("views", "./public" )

app.get("/", function(req, res){
    res.render("home");
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use('/', authRoute);
app.use('/users', userRoute);
app.use('/dairy', dairyRoute);


mongoose.connect(   
    "mongodb+srv://sontung:123@cluster0.x4drv.mongodb.net/SheCodes?retryWrites=true&w=majority",
    {useNewUrlParser: true}
)
.then(result =>{
    console.log("Successfully connected to the database");   
})
.catch(err =>{
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})


server.listen(3000,()=>{

    console.log('Message: SERVER is running on port 3000');

});

