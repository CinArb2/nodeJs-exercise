//import express module
const express = require('express')

//limit repeated requests to public APIs
const rateLimit = require('express-rate-limit');

// Utils - connecting to database
const { db } = require('./utils/database');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controllers');

//import routers
const {usersRouter} = require('./routes/users.routes')
const {repairsRouter} = require('./routes/repairs.routes')

//import Models 
const { User } = require('./models/user.model')
const { Repair } = require('./models/repair.model')

//init express app
const app = express()

// Enable incoming JSON data
app.use(express.json());


// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

//ENDPOINTS
//http://localhost:9000/api/v1/users - users endpoint
app.use('/api/v1/users', usersRouter)
//http://localhost:9000/api/v1/repairs - repairs endpoint
app.use('/api/v1/repairs', repairsRouter)


//GLOBAL ERROR HANDLER
app.use('*', globalErrorHandler)

//autenticando base de datos
db.authenticate()
  .then(()=> console.log('exitosa la conexion'))
  .catch((err) => console.log(err))
  
// 1 User <----> M repairs
User.hasMany(Repair);
Repair.belongsTo(User);


//sincronizar modelos 
db.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

// Spin up server
//define the port
const PORT = process.env.PORT || 9000

//start server and listen request
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`)
})


