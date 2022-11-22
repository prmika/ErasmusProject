using DDDNetCore.Domain;
using DDDNetCore.Domain.Warehouses;
using DDDNetCore.Infrastructure;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Infrastructure.Shared;
using System.Collections.Generic;
using System.Linq;

namespace DDDSample1.Infrastructure.Warehouses
{
    public class WarehouseRepository: IWarehouseRepository
    {
        private BackendContext _backendContext; 
        public WarehouseRepository(BackendContext backendContext) 
        { 
            _backendContext = backendContext; 
        }

        public Warehouse Create(Warehouse warehouse)
        {
            _backendContext.Warehouses.Add(warehouse);
            return warehouse;
        }

        public IEnumerable<Warehouse> GetAll()
        {
            return _backendContext.Warehouses;
        }

        public Warehouse GetById(string id)
        {
            return _backendContext.Warehouses.Where(warehouse => warehouse.Id == id).FirstOrDefault();
        }

        public void Update(Warehouse warehouse)
        {
            _backendContext.Update(warehouse);
        }
    }
}