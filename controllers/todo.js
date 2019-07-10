const mysql   = require('mysql');
const db      = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : '00no@hf0011',
    database : 'ninjatasker'
});

db.connect(function(err){
    if (err) throw err;
    console.log("DB is connected ...");
});

exports.allTodos =  (req, res) => {
    let sql = 'SELECT * FROM task';
    db.query(sql, function (err, results) {
        if (err) throw err;
        // rendering tasks view and passing taskToDo data
        res.render('tasks', {taskToDo: results});
    });
};

exports.addTask = (req, res) => {
    let task = req.body
    let sql = 'INSERT INTO task SET ?';
    db.query(sql, task, function (err, results) {
        if (err) throw err;
        // rendering tasks view and passing taskToDo data
        console.log(results)
        res.redirect('/')
    });
};

exports.removeTask = (req, res) => {
    let sql = 'DELETE  FROM task WHERE ID=' + req.params.id;
    db.query(sql,(err, result) =>{
        if(err) throw err;
        console.log(result);
        res.json(result)
    });
};