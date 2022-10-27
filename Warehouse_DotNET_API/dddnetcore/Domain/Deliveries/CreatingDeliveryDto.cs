using System;
using DDDSample1.Domain.Warehouses;
namespace DDDSample1.Domain.Deliveries
{
    public class CreatingDeliveryDto
    {
        
        public DateOnly deliveryDate {get; set;}
        public string weight { get; set; }
        public WarehouseId warehouseID { get; set; }
        public TimeOnly timeToPlace  { get; set; }
        public TimeOnly timeToPickup { get; set; }



        public CreatingDeliveryDto( DateOnly date, string mass, WarehouseId warehouseId, TimeOnly toPlace, TimeOnly toPickup)
        {
            this.deliveryDate = date;
            this.weight = mass;
            this.warehouseID = warehouseId;
            this.timeToPlace = toPlace;
            this.timeToPickup = toPickup;
        }
    }
}