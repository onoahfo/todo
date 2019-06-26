const express = require('express')
const app = express()



app.set("view engine","ejs");

app.get('/home', function (req, res) {
    res.render('home');
  });

  app.listen(3000, function(err){
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})