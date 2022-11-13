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
        public int timeToPickup { get; private set; }
        public int timeToPlace { get; private set; }


         public void ChangeDeliveryDate(DateTime date)
        {
            this.deliveryDate = date;
        }
        public void ChangeWeight(double mass) {
            this.weight = mass;
        }
        public void ChangeWarehouseId(string warehouseId) {
            this.warehouseID = warehouseId;
        }
        public void ChangeTimeToPlace(int toPlace) {
            this.timeToPlace = toPlace;
        }
        public void ChangeTimeToPickup(int toPickup) {
            this.timeToPickup = toPickup;
        }

        private Delivery()
        {
            
        }

        public Delivery(string code, DateTime date, double mass, string warehouseId, int toPickup, int toPlace)
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