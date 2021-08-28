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
        pool.query(`CREATE TABLE ${req.body.user} (Commander VARCHAR, opponent1 CITEXT, opponent2 CITEXT,opponent3 CITEXT,commander1 CITEXT, commander2 CITEXT, commander3 CITEXT, lifeGain Int, place Int, win varchar, commanderDelt1 Int, commanderDelt2 Int, commanderDelt3 Int, commanderDeltBy1 Int, commanderDeltBy2 Int, commanderDeltBy3 Int, turnsAlive Int, Turns Int, KilledWho varchar, Killed Int, KilledDmg Int, KilledCmd Int, KilledPoison Int, KilledBy VARCHAR, KilledHow VARCHAR);`)
      }) .catch(e => {
        console.log(e);
        res.send(e)
      });;
})

databaseRoutes.post('/login', (req, res)=>{
  pool.query(
    `select * from "users" WHERE email = '${req.body.email}' AND user_password = '${req.body.password}'`
  ).then(result => {
    res.send(result);
  }) .catch(e => {
    console.log(e);
    res.send(e)
  });;
});




databaseRoutes.post('/subGameData', function (req, res) {
  console.log(req.body.you);
  pool.query(`insert into ${req.body.you} (opponent1,	opponent2,	opponent3,	commander1,	commander2,	commander3,	lifeGain,	place,	win,	commanderDelt1,	commanderDelt2,	commanderDelt3,	commanderDeltBy1,	commanderDeltBy2,	commanderDeltBy3,	turnsAlive,	Turns,	KilledWho,	Killed,	KilledDmg,	KilledCmd,	KilledPoison,	KilledBy,	KilledHow, Commander) values ($1::CITEXT, $2::CITEXT,$3::CITEXT, $4::CITEXT, $5::CITEXT, $6::CITEXT, $7::Int, $8::Int, $9::varchar, $10::Int, $11::Int, $12::Int, $13::Int, $14::Int, $15::Int, $16::Int, $17::Int, $18::varchar, $19::Int, $20::Int, $21::Int, $22::Int, $23::VARCHAR, $24::VARCHAR, $25::VARCHAR)`,
      [ 
          req.body.opponent1,
          req.body.opponent2,
          req.body.opponent3,
          req.body.commander1,
          req.body.commander2,
          req.body.commander3,
          req.body.lifeGain,
          req.body.place,
          req.body.win,
          req.body.commanderDelt1,
          req.body.commanderDelt2,
          req.body.commanderDelt3,
          req.body.commanderDeltBy1,
          req.body.commanderDeltBy2,
          req.body.commanderDeltBy3,
          req.body.turnsAlive,
          req.body.Turns,
          req.body.KilledWho,
          req.body.Killed,
          req.body.KilledDmg,
          req.body.KilledCmd,
          req.body.KilledPoison,
          req.body.KilledBy,
          req.body.KilledHow,
          req.body.commander
         
      ]).then(result => {
        res.send(result);
        console.log(res)
      }) .catch(e => {
        console.log(e);
        res.send(e)
      });;
})
 

// CREATE TABLE playerTable (
// 	opponent1 CITEXT,
// 	opponent2 CITEXT,
// 	opponent3 CITEXT,
// 	commander1 CITEXT,
// 	commander2 CITEXT,
// 	commander3 CITEXT,
// 	lifeGain Int,
// 	place Int,
// 	win varchar,
// 	commanderDelt1 Int,
// 	commanderDelt2 Int,
// 	commanderDelt3 Int,
// 	commanderDeltBy1 Int,
// 	commanderDeltBy2 Int,
// 	commanderDeltBy3 Int,
// 	turnsAlive Int,
// 	Turns Int,
// 	KilledWho varchar,
// 	Killed Int,
// 	KilledDmg Int,
// 	KilledCmd Int,
// 	KilledPoison Int,
// 	KilledBy VARCHAR,
// 	KilledHow VARCHAR
// );



module.exports= databaseRoutes;


