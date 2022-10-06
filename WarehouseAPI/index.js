const express = require('express')
const app = express()
var fs = require("fs");

app.get('/warehouses', function (req, res) {
   fs.readFile( __dirname + "/" + "warehouses.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/warehouses/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "warehouses.json", 'utf8', function (err, data) {
       var warehouses = JSON.parse( data );
       var warehouse = warehouses["warehouse" + req.params.id] 
       console.log( warehouse );
       res.end( JSON.stringify(warehouse));
    });
 })

 app.delete('/warehouses/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "warehouses.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["warehouse" + req.params.id];
        
       console.log( data );
       console.log("Data succesfully deleted")

       //Save the new data to the warehouses.json file (overwrite)
       res.end( JSON.stringify(data));
    });
 })


app.listen(3000, (err)=>{
    if(!err){
        console.log("Succesfully listening on port 3000")
    }
})