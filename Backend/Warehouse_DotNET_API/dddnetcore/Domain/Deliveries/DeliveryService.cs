using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;




namespace DDDNetCore.Domain.Deliveries
{
    public class DeliveryService: IDeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeliveryService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public List<Delivery> GetAllDeliveries()
        {
            return _unitOfWork.DeliveryRepository.GetAll().ToList();
        }

        public Delivery GetOneDelivery(string id)
        {
            return _unitOfWork.DeliveryRepository.GetById(id);
        }

        public Delivery AddDelivery(DeliveryDto delivery)
        {
            var war = _unitOfWork.WarehouseRepository.GetById(delivery.WarehouseId);
            if (war == null){
                throw new BusinessRuleValidationException($"Warehous id:{delivery.WarehouseId} does not exist");
            }
            else {
            Delivery deliveryToCreate = new Delivery(delivery.Id, delivery.DeliveryDate, delivery.Weight, delivery.WarehouseId, delivery.TimeToPickup, delivery.TimeToPlace);
            _unitOfWork.DeliveryRepository.Create(deliveryToCreate);
            _unitOfWork.Commit();
            return deliveryToCreate;
            }
        }

        public Delivery UpdateDelivery(DeliveryDto delivery)
        {
            var war = _unitOfWork.WarehouseRepository.GetById(delivery.WarehouseId);
            if (war == null){
                throw new BusinessRuleValidationException($"Warehous id:{delivery.WarehouseId} does not exist");
            }
            else{
            Delivery deliveryToUpdate = new Delivery(delivery.Id,  delivery.DeliveryDate, delivery.Weight, delivery.WarehouseId, delivery.TimeToPickup, delivery.TimeToPlace);
            _unitOfWork.DeliveryRepository.Update(deliveryToUpdate);
            _unitOfWork.Commit();
            return deliveryToUpdate;
            }
        }

        

        
    }
}