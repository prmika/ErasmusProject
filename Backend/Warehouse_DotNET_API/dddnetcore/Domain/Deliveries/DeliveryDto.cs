using System;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryDto
    {
        public string Id { get;  set; }
        public DateTime DeliveryDate {get;  set;}
        public double Weight { get;  set; }
        public string WarehouseId { get;  set; }
        public int TimeToPickup { get; set; }
        public int TimeToPlace  { get;  set; }
    }
}