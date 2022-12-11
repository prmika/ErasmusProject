module.exports = {
  apps : [{
    name   : "Logistics",
    script : "npm run start",
    cwd : "./Backend/LogisticsAPI"
  },
  {
    name   : "Warehouses",
    script : "dotnet run",
    cwd    : "./Backend/Warehouse_DotNET_API/dddnetcore"
  },
  {
    name   : "Frontend",
    script : "ng serve --host 0.0.0.0",
    cwd    : "./Frontend/lab5frontend"
  }
]
}
