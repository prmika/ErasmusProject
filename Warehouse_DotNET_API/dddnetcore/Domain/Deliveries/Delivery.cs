using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
    
namespace DDDSample1.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot
    {

        public DateTime deliveryDate {get; private set;}
        public string weight { get; private set; }
        public string warehouseID { get; private set; }
        public DateTime timeToPlace  { get; private set; }
        public DateTime timeToPickup { get; private set; }


        private Delivery()
        {
            
        }
        public void ChangeDeliveryDate(DateTime date)
        {
            this.deliveryDate = date;
        }
        public void ChangeWeight(string mass) {
            this.weight = mass;
        }
        public void ChangeWarehouseId(string warehouseId) {
            this.warehouseID = warehouseId;
        }
        public void ChangeTimeToPlace(DateTime toPlace) {
            this.timeToPlace = toPlace;
        }
        public void ChangeTimeToPickup(DateTime toPickup) {
            this.timeToPickup = toPickup;
        }

        public Delivery(string code,  DateTime date, string mass, string warehouseId, DateTime toPlace, DateTime toPickup )
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