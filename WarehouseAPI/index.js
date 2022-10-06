const express = require('express')
const app = express()
var fs = require("fs");

app.get('/warehouses', function (req, res) {
   fs.readFile( __dirname + "/" + "warehouses.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})


app.listen(3000, (err)=>{
    if(!err){
        console.log("Succesfully listening on port 3000")
    }
})