// I have get most of this code from lecturer Mihail Timotev code. 

var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    expAutoSan = require('express-autosanitizer');

//dotenv is used for reading the .env MongoDB URL
const dotenv = require('dotenv');
dotenv.config();
    
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'views')));
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(expAutoSan.allUnsafe);

app.get('/', function(req, res){
    res.render('index');
})

//items route
const itemsRouter = require('./router/item-routes')
//orders route
const ordersRouter = require('./router/order-routes')

app.use('/items', itemsRouter);
app.use('/orders', ordersRouter);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

//connecting to the database with mongoose
mongoose.connect(process.env.MONGO_DB_URL);
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});