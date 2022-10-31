using System;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseDto
    {
        public string Id { get; set; }
        public string Designation { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}