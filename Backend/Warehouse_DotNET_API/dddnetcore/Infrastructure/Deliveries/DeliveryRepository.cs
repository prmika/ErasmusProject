using System.Collections.Generic;
using DDDNetCore.Domain;
using DDDNetCore.Domain.Deliveries;
using DDDNetCore.Infrastructure;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Infrastructure.Shared;
using System.Linq;

namespace DDDSample1.Infrastructure.Deliveries
{
    public class DeliveryRepository: IDeliveryRepository
    {
        private BackendContext _backendContext;

        public DeliveryRepository(BackendContext context) 
        {
            _backendContext = context;
        }

        public Delivery Create(Delivery delivery)
        {
            _backendContext.Deliveries.Add(delivery);
            return delivery;
        }

        public IEnumerable<Delivery> GetAll()
        {
            return _backendContext.Deliveries;
        }

        public IEnumerable<Delivery> GetAllPaged(int page, int numberOfItems)
        {
            int amountToSkip = (page - 1) * numberOfItems;
            return _backendContext.Deliveries.Skip(amountToSkip).Take(numberOfItems);
        }

        public Delivery GetById(string id)
        {
             return _backendContext.Deliveries.Where(delivery => delivery.Id == id).FirstOrDefault();
        }

        public void Update(Delivery delivery)
        {
         _backendContext.Update(delivery);
        
        }
    }
}