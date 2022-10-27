using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public class Warehouse : Entity<WarehouseId>, IAggregateRoot
    {
        public string WarehouseNr { get; private set; }
        public string Designation { get; private set; }
        public string Address { get; private set; }
        public double Latitude { get; private set; }
        public double Longitude { get; private set; }


        private Warehouse()
        {
            
        }

        public Warehouse(string warehouseNr, string des, string add, double lat, double longt)
        {
            this.Id = new WarehouseId(Guid.NewGuid());
            this.WarehouseNr = warehouseNr;
            this.Designation = des;
            this.Address = add;
            this.Latitude = lat;
            this.Longitude = longt;
        }

    }
}