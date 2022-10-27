using System;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryDto
    {
        
        public string Id { get;  set; }
        public DateTime deliveryDate {get;  set;}
        public string weight { get;  set; }
        public string warehouseID { get;  set; }
        public DateTime timeToPlace  { get;  set; }
        public DateTime timeToPickup { get;  set; }
    public DeliveryDto(string code, DateTime date, string mass, string warehouseId, DateTime toPlace, DateTime toPickup)
    {
        this.Id = code;
        this.deliveryDate = date;
        this.weight = mass;
        this.warehouseID = warehouseId;
        this.timeToPlace = toPlace;
        this.timeToPickup = toPickup;
    }
    }
}