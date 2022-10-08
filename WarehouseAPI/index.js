const express = require('express')
const app = express()
const bp = require("body-parser")
var fs = require("fs");
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/warehouses', function (req, res) {
    fs.readFile(__dirname + "/" + "warehouses.json", 'utf8', function (err, data) {
        if (!err) {
            console.log(JSON.parse(data));
            res.end(data);
        }
        else{
            console.log(err);
            res.send("Error while trying to retrieve warehouse data.");
        }
    });
})

app.get('/warehouses/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "warehouses.json", 'utf8', function (err, data) {
        var warehouses = JSON.parse(data);
        var warehouse = warehouses["warehouse" + req.params.id];
        if (warehouse != undefined) {
            res.send(JSON.stringify(warehouse));
        }
        else {
            res.send("Warehouse doesn't exist.");
        }
    });
})

app.delete('/warehouses/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "warehouses.json", 'utf8', function (err, data) {
        warehouses = JSON.parse(data);
        let warehouse = warehouses["warehouse" + req.params.id];
        if (warehouse != undefined) {
            delete warehouses["warehouse" + req.params.id];
            fs.writeFile("warehouses.json", JSON.stringify(warehouses), function (err) {
                if (err) {
                    console.log("There was an error while saving the updated json data");
                    console.log(err)
                    res.send("The warehouse was not deleted successfully because of an internal error.");
                }
                else {
                    console.log("Warehouse was successfully deleted.");
                    res.send("The warehouse was deleted successfully.");
                }
            });
        }
        else {
            res.end("The warehouse doesn't exist");
        }
    });
})

app.put("/warehouses/:id",(req,res) => {
    fs.readFile(__dirname + "/" + "warehouses.json", 'utf8', function (err, data) {
        warehouses = JSON.parse(data);
        let warehouse = warehouses["warehouse" + req.params.id];
        if (warehouse != undefined) {
            if(warehouse.id == req.body.id.replace("W0","")){
                let warehouseid = "warehouse" + req.body.id.replace("W0", "");
                let newwarehouse = {
                    "warehouse": {
                        "id": req.body.id,
                        "designation": req.body.designation,
                        "address": req.body.address,
                        "latitude": req.body.latitude,
                        "longitude": req.body.longitude
                    }
                }
                warehouses[warehouseid] = newwarehouse["warehouse"];
                console.log(warehouses)
                fs.writeFile("warehouses.json", JSON.stringify(warehouses), function (err) {
                    if (err) {
                        console.log("There was an error while saving the json data");
                        res.send("The warehouse was not saved successfully.");
                    }
                    else {
                        console.log("Data was successfully saved.");
                        res.send(JSON.stringify(warehouses["warehouse" + req.body.id.replace("W0", "")]));
                    }
                });
            }
            else{
                console.log("The IDs of the request and the url parameters didn't match.")
                res.send("Both IDs didn't match.")
            }
        }
        else {
            res.end("The warehouse doesn't exist. Do a POST request to add it.");
        }
    });
});

app.post("/warehouses", (req, res) => {
    if (req.body.id != undefined && req.body.designation != undefined && req.body.address != undefined && req.body.latitude != undefined
        && req.body.longitude != undefined) {
        fs.readFile(__dirname + "/" + "warehouses.json", 'utf8', function (err, data) {
            var warehouses = JSON.parse(data);
            var warehouse = warehouses["warehouse" + req.body.id.replace("W0", "")];

            if (warehouse == undefined) {
                console.log("warehouse is undefined");
                let warehouseid = "warehouse" + req.body.id.replace("W0", "");
                let newwarehouse = {
                    "warehouse": {
                        "id": req.body.id,
                        "designation": req.body.designation,
                        "address": req.body.address,
                        "latitude": req.body.latitude,
                        "longitude": req.body.longitude
                    }
                }
                warehouses[warehouseid] = newwarehouse["warehouse"];
                console.log(warehouses)
                fs.writeFile("warehouses.json", JSON.stringify(warehouses), function (err) {
                    if (err) {
                        console.log("There was an error while saving the json data");
                        res.send("The warehouse was not saved successfully.");
                    }
                    else {
                        console.log("Data was successfully saved.");
                        res.send(JSON.stringify(warehouses["warehouse" + req.body.id.replace("W0", "")]));
                    }
                });
            }
            res.send("The warehouse already existed.");
        })
    }
    else {
        res.end("Not all correct parameters were in the JSON (id, designation, address, latitude, longitude).");
    }
});


app.listen(3000, (err) => {
    if (!err) {
        console.log("Succesfully listening on port 3000");
    }
})