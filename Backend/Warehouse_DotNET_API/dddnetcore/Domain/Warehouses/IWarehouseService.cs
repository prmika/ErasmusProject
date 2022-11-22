using DDDSample1.Domain.Warehouses;
using System.Collections.Generic;

namespace DDDNetCore.Domain.Warehouses
{
    public interface IWarehouseService
    {
        public List<Warehouse> GetAllWarehouses();
        public Warehouse GetOneWarehouse(string id);
        public Warehouse AddWarehouse(WarehouseDto warehouse);
        public Warehouse UpdateWarehouse(WarehouseDto warehouse);
    }
}
