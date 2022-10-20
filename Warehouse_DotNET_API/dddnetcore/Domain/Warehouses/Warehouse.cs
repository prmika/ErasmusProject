using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public class Warehouse : Entity<WarehouseId>, IAggregateRoot
    {

        public string ID { get; private set; }
        public string designaion { get; private set; }
        public string address { get; private set; }
        public double latitude { get; private set; }
        public double longitude { get; private set; }


        private Warehouse()
        {
            
        }

        public Warehouse(string id, string des, string add, double lat, double longt)
        {
            this.ID = id;
            this.designaion = des;
            this.address = add;
            this.latitude = lat;
            this.longitude = longt;
        }

    }
}