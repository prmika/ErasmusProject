using System;
using DDDSample1.Domain.Shared;

namespace DDDNetCore.Domain.Warehouses
{
    public class Warehouse
    {
        public string Id { get; set; }
        public string Designation { get; private set; }
        public string Address { get; private set; }
        public double Latitude { get; private set; }
        public double Longitude { get; private set; }
        public bool IsActive { get; private set; }


        private Warehouse()
        {

        }

        public Warehouse(string id,  string des, string add, double lat, double longt, bool active)
        {
            this.Id = id;
            this.Designation = des;
            this.Address = add;
            this.Latitude = lat;
            this.Longitude = longt;
            this.IsActive = active;
        }

        

    }
}