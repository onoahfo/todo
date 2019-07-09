const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'student',
    database : 'ninjatasker'
});

db.connect(function(err){
    if (err) throw err;
    console.log("DB is connected ...");
});


const urlEncoded = bodyParser.urlencoded({extended: false})

const dummyData = [{taskItem: "Work on my portfolio" },{taskItem: "Code and watch anime"},{taskItem: "Sleep"}];

// setting up
const app = express();

// setting template engine
app.set("view engine","ejs");

// use middle ware to serve static files
app.use(express.static('./public'));

// ############### ROUTES ##############

// Get for tasks: returns all tasks
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM task';
    db.query(sql, function (err, results) {
        if (err) throw err;
        // rendering tasks view and passing taskToDo data
        res.render('tasks', {taskToDo: results});
    });
});

// Post for tasks: posting a task
app.post('/tasks', urlEncoded, (req, res) => {
    let task = req.body
    let sql = 'INSERT INTO task SET ?';
    db.query(sql, task, function (err, results) {
        if (err) throw err;
        // rendering tasks view and passing taskToDo data
        console.log(results)
        res.redirect('/')
    });
// formatting for incoming data to add to my data set
//   let incomingItem = {};
//   incomingItem.taskItem = req.body.task;
//   dummyData.push(incomingItem);
  
});

// Delete for task: deleting specify task
app.delete("/tasks/:id", (req, res) => {
    // deleteing item from data set
    dummyData.splice(req.params.id, 1);
    res.json(dummyData)
});

app.listen(3000, function(err){
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})