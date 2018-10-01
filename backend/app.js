const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const each = require('async-each');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Timesheet"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.post("/api/signup",(req, res, next)=> {
  bcrypt.hash(req.body.password,10)
    .then(hash => {
      var query = `SELECT manager_id,first_name,last_name FROM Manager_info WHERE manager_id='${req.body.authCode}';`
      con.query(query, function(err, result){
        if (err) throw err;
        firstName = result[0].first_name;
        lastName =  result[0].last_name;
        if (result[0].manager_id) {
          employeeId = uuid.v4();
          query = `INSERT INTO Employee_info VALUES ('${employeeId}','${result[0].manager_id}','${req.body.firstName}','${req.body.lastName}','${req.body.email}',${req.body.address},'${hash}');`;
          con.query(query, function(err, result){
            if (err) throw err;
            return res.status(201).json({
              message: 'successful signup',
              id: employeeId,
              managerName: `${firstName} ${lastName}`,
              address: req.body.address,
              });
          });
        }
      });
    })
});

app.post("/api/timesheet/:id", (req, res, next) => {
  const task_id = uuid.v4();
  var query = `INSERT INTO Employee_timesheet VALUES ('${task_id}','${req.params.id}','${req.body.workTitle}','${req.body.clientName}','${req.body.clientId}','${req.body.totalTime}');`;
  con.query(query, function(err, result){
    if (err) throw err;
    for (time_entry in req.body.time){
      query = `INSERT INTO Time_entries VALUES ('${uuid.v4()}','${task_id}','${time_entry.startTime}','${time_entry.endTime}');`;
      con.query(query, function(err, result){
        if (err) throw err;
      });
    }
  });
  return res.status(201).json({
    message: 'Timesheet added successfully'
  });
});

app.post("/api/login", (req, res, next) =>{
  var query = `SELECT password,employee_id,manager_id,first_name,last_name,address FROM Employee_info WHERE email='${req.body.email}';`
  con.query(query,(err,results) => {
    if (err) throw err;
    if(bcrypt.compare(req.body.password,results[0].password)){
      query = `SELECT first_name,last_name FROM Manager_info WHERE manager_id='${results[0].manager_id}';`
      con.query(query,(err,result) => {
        if (err) throw err;
        return res.status(200).json({
          message:"User Logged in",
          id: results[0].employee_id,
          managerName: `${result[0].first_name} ${result[0].last_name}`,
          UserName: `${results[0].first_name} ${results[0].last_name}`
        });
      });
    }else{
      return res.status(401).json({
        message: "User credentials are incorrect"
      });
    }
  })
});


app.get("/api/clients/:id", (req, res, next) => {
  var clientNames=[];
  var queries = []
  var query = `SELECT client_id FROM Client_pool WHERE employee_id='${req.params.id}'`;
  con.query(query, (err, results)=>{
    if (err) throw err;
    for (var i=0; j=results.length,i<j; i++){
      queries.push(`SELECT first_name,last_name FROM Client_info WHERE client_id = '${results[i].client_id}';`);
    }
    each(queries,(item,callback)=>{
      con.query(item,(err,names) =>{
        if (err) throw err;
        callback(null,clientNames.push(`${names[0].first_name} ${names[0].last_name}`));
      })
    },function(err,response){
      return res.status(200).json({
        message: "Fetched Clients Names",
        clients: clientNames,
      });
    });
    }
  );
});

module.exports = app;
