using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
    
namespace DDDSample1.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot
    {

        public DateTime deliveryDate {get; private set;}
        public double weight { get; private set; }
        public string warehouseID { get; private set; }
        public DateTime timeToPickup { get; private set; }

        public DateTime timeToPlace { get; private set; }


        private Delivery()
        {
            
        }

        public Delivery(string code, DateTime date, double mass, string warehouseId, DateTime toPickup, DateTime toPlace)
        {
            this.Id = new DeliveryId(code);
            this.deliveryDate = date;
            this.weight = mass;
            this.warehouseID = warehouseId;
            this.timeToPlace = toPlace;
            this.timeToPickup = toPickup;

        }

    }
}