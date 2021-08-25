const express = require('express');
const databaseRoutes = express.Router(); 
const pool = require("./connection/connections");
var bodyParser = require('body-parser')
const cors = require('cors')
databaseRoutes.use(cors());

databaseRoutes.use(bodyParser.json())


function getUsers(req, res){
console.log("hello")
    pool.query('select * from "users"').then(result => {
        res.send(result.rows);
      });
}

databaseRoutes.get('/getUsers', getUsers)


databaseRoutes.post('/createUser', (req, res)=>{
 console.log()



 pool.query("insert into users (email, user_name, user_password) values ($1::text, $2::text, $3::text)",
      [
        req.body.email,
         req.body.user,
          req.body.password   
      ]).then(result => {
        res.send(result);
      }) .catch(e => {
        console.log(e);
        res.send(e)
      });;
})

databaseRoutes.post('/login', (req, res)=>{
  pool.query(
    // `select * from "users" WHERE email = 'kpbalboa@gmail.com' AND user_password = '78iu&*IU`
    `select * from "users" WHERE email = '${req.body.email}' AND user_password = '${req.body.password}'`
  ).then(result => {
    res.send(result);
  }) .catch(e => {
    console.log(e);
    res.send(e)
  });;
});




databaseRoutes.get('/', function (req, res) {
  res.send('Birds home page')
})



module.exports= databaseRoutes;


