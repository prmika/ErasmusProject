using System;
using DDDSample1.Domain.Warehouses;
namespace DDDSample1.Domain.Deliveries
{
    public class CreatingDeliveryDto
    {
        public string Id {get; set;}
        public DateTime deliveryDate {get; set;}
        public string weight { get; set; }
        public string warehouseID { get; set; }
        public int timeToPlace  { get; set; }
        public int timeToPickup { get; set; }



        public CreatingDeliveryDto( string code, DateTime date, string mass, string warehouseId, int toPlace, int toPickup)
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