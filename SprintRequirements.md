Requirements:



1. logistics with node.js:

Trucks and routes between two warehouses
-Create
-List
-Edit
----------------------------
Trucks:
-tare : "8.0 tonnes"
-load capasity : "4.5 tonnes"
-max charge of truck's electric battery : "80kWh"
-fast charging time for the truck's batteries : "1hour from 20% to 80%"
-----------------------------
Route between two warehouses:
-id of the departure warehouse : "W01"
-id of the arrival warehouse : "W02"
-distance : "10km"
-time : (in minutes) "27min"
-battery energy used: "13kWh"



2. Warehouses with dotNET:

Warehouses and deliveries
-Create
-List
-Edit
-----------------------------
Warehouses:
-Identifier : "Wxx"
-Designation : "Matoshintos"
-address : "someroad 123, 4450-222 Matosinhos, Portugal"
-coordinates : (latitude, longitude)
-----------------------------
delivery plan:
-identifier : "Dxxxxx"
-Date : "01/01/2022"
-mass of delivery : "5000 kg"
-warehouse for delivery : store identifier
-time to place delivery on the truck : (in minutes)
-time to pickup the delivery from the truck : (in minutes)

