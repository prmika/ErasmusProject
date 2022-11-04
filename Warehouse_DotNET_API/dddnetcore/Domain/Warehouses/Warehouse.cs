using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public class Warehouse : Entity<WarehouseId>, IAggregateRoot
    {
        public string Designation { get; private set; }
        public string Address { get; private set; }
        public double Latitude { get; private set; }
        public double Longitude { get; private set; }


        private Warehouse()
        {
            
        }

        public Warehouse(string code,  string des, string add, double lat, double longt)
        {
            this.Id = new WarehouseId(code);
            this.Designation = des;
            this.Address = add;
            this.Latitude = lat;
            this.Longitude = longt;
        }

        public void ChangeDesignation(string des)
        {
            this.Designation = des;
        }

        public void ChangeAddress(string adr)
        {
            this.Address = adr;
        }

        public void ChangeLat(double lat)
        {
            this.Latitude = lat;
        }

        public void ChangeLong(double longt)
        {
            this.Longitude = longt;
        }

    }
}