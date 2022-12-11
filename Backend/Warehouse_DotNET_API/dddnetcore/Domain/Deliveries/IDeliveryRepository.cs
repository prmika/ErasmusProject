using DDDNetCore.Domain.Deliveries;
using DDDNetCore.Domain.Warehouses;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace DDDSample1.Domain.Deliveries
{
    public interface IDeliveryRepository
    {
        public IEnumerable<Delivery> GetAll();

        public IEnumerable<Delivery> GetAllPaged(int page, int numberOfItems);
        public Delivery GetById(string id);
        public Delivery Create(Delivery delivery);
        public void Update(Delivery delivery);
    }
}