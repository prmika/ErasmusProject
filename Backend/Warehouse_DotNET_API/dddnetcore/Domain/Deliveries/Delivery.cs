using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;


namespace DDDNetCore.Domain.Deliveries
{
    public class Delivery
    {
        public string Id { get; set; }
        public DateTime DeliveryDate { get; set; }
        public double Weight { get; set; }
        public string WarehouseID { get; set; }
        public int TimeToPickup { get; set; }
        public int TimeToPlace { get; set; }


        //public void ChangeDeliveryDate(DateTime date)
        //{
        //    this.deliveryDate = date;
        //}
        //public void ChangeWeight(double mass) {
        //    this.weight = mass;
        //}
        //public void ChangeWarehouseId(string warehouseId) {
        //    this.warehouseID = warehouseId;
        //}
        //public void ChangeTimeToPlace(int toPlace) {
        //    this.timeToPlace = toPlace;
        //}
        //public void ChangeTimeToPickup(int toPickup) {
        //    this.timeToPickup = toPickup;
        //}

        //private Delivery()
        //{

        //}

        //public Delivery(string code, DateTime date, double mass, string warehouseId, int toPickup, int toPlace)
        //{
        //    this.Id = new DeliveryId(code);
        //    this.deliveryDate = date;
        //    this.weight = mass;
        //    this.warehouseID = warehouseId;
        //    this.timeToPlace = toPlace;
        //    this.timeToPickup = toPickup;

        //}

    }
}