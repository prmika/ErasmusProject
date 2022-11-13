using System;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryDto
    {
        public string Id { get;  set; }
        public DateTime deliveryDate {get;  set;}
        public double weight { get;  set; }
        public string warehouseID { get;  set; }
        public int timeToPickup { get; set; }
        public int timeToPlace  { get;  set; }
        

    }
}