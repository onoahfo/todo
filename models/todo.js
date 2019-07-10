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

module.exports = db;