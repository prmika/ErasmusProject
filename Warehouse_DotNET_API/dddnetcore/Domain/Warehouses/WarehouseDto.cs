using System;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseDto
    {
        public string ID { get; set; }
        public string designaion { get; set; }
        public string address { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
    }
}