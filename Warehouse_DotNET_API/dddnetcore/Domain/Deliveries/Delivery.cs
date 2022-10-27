using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
    
namespace DDDSample1.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot
    {

    
        public DateOnly deliveryDate {get; private set;}

        public string weight { get; private set; }
        public WarehouseId warehouseID { get; private set; }
        public TimeOnly timeToPlace  { get; private set; }
        public TimeOnly timeToPickup { get; private set; }


        private Delivery()
        {
            
        }
        public void ChangeDeliveryDate(DateOnly date)
        {
            this.deliveryDate = date;
        }
        public void ChangeWeight(string mass) {
            this.weight = mass;
        }
        public void ChangeWarehouseId(WarehouseId warehouseId) {
            this.warehouseID = warehouseId;
        }
        public void ChangeTimeToPlace(TimeOnly toPlace) {
            this.timeToPlace = toPlace;
        }
        public void ChangeTimeToPickup(TimeOnly toPickup) {
            this.timeToPickup = toPickup;
        }

        public Delivery(DateOnly date, string mass, WarehouseId warehouseId, TimeOnly toPlace, TimeOnly toPickup )
        {
            this.Id = new DeliveryId(Guid.NewGuid());
            this.deliveryDate = date;
            this.weight = mass;
            this.warehouseID = warehouseId;
            this.timeToPlace = toPlace;
            this.timeToPickup = toPickup;

        }

    }
}