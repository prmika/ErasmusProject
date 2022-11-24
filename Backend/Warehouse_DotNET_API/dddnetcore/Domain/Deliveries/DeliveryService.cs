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

        //gets all deliveries from database and returns list of deliveries
        public List<Delivery> GetAllDeliveries()
        {
            return _unitOfWork.DeliveryRepository.GetAll().ToList();
        }

        //gets delivery which match with id and returns it 
        public Delivery GetOneDelivery(string id)
        {
            return _unitOfWork.DeliveryRepository.GetById(id);
        }

        //adds delivery to the database
        public Delivery AddDelivery(DeliveryDto delivery)
        {
            //gets warehouse with passed id from the database
            var war = _unitOfWork.WarehouseRepository.GetById(delivery.WarehouseId);
            //checks if warehouse exist -- if not returns error message 
            if (war == null){
                throw new BusinessRuleValidationException($"Warehouse id:{delivery.WarehouseId} does not exist");
            }
            else {
            Delivery deliveryToCreate = new Delivery(delivery.Id, delivery.DeliveryDate, delivery.Weight, delivery.WarehouseId, delivery.TimeToPickup, delivery.TimeToPlace);
            _unitOfWork.DeliveryRepository.Create(deliveryToCreate);
            _unitOfWork.Commit();
            return deliveryToCreate;
            }
        }

        //updates delivery from database
        public Delivery UpdateDelivery(DeliveryDto delivery)
        {
            //gets warehouse with passed id from the database
            var war = _unitOfWork.WarehouseRepository.GetById(delivery.WarehouseId);
            //checks if warehouse exist
            if (war == null){
                throw new BusinessRuleValidationException($"Warehous id:{delivery.WarehouseId} does not exist");
            }
            else{
            //updates the delivery
            Delivery deliveryToUpdate = new Delivery(delivery.Id,  delivery.DeliveryDate, delivery.Weight, delivery.WarehouseId, delivery.TimeToPickup, delivery.TimeToPlace);
            _unitOfWork.DeliveryRepository.Update(deliveryToUpdate);
            _unitOfWork.Commit();
            return deliveryToUpdate;
            }
        }

        

        
    }
}