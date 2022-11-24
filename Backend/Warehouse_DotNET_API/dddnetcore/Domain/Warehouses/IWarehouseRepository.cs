using DDDNetCore.Domain.Warehouses;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using System;

namespace DDDSample1.Domain.Warehouses
{
    public interface IWarehouseRepository
    {
        public IEnumerable<Warehouse> GetAll();
        public Warehouse GetById(string id);
        public Warehouse Create(Warehouse warehouse);
        public void Update(Warehouse warehouse);
    }
}