using DDDSample1.Domain.Deliveries;
using System.Collections.Generic;

namespace DDDNetCore.Domain.Deliveries
{
    public interface IDeliveryService
    {
        public List<Delivery> GetAllDeliveries();
        public Delivery GetOneDelivery(string id);
        public Delivery AddDelivery(DeliveryDto delivery);
        public Delivery UpdateDelivery(DeliveryDto delivery);
    }
}
