﻿using System;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryDto
    {
        
        public Guid Id { get;  set; }
        public DateOnly deliveryDate {get;  set;}
        public string weight { get;  set; }
        public string warehouseID { get;  set; }
        public TimeOnly timeToPlace  { get;  set; }
        public TimeOnly timeToPickup { get;  set; }
    public DeliveryDto(Guid Id, DateOnly date, string mass, string warehouseId, TimeOnly toPlace, TimeOnly toPickup)
    {
        this.Id = Id;
        this.deliveryDate = date;
        this.weight = mass;
        this.warehouseID = warehouseId;
        this.timeToPlace = toPlace;
        this.timeToPickup = toPickup;
    }
    }
}