using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;




namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWarehouseRepository _warrepo;
        private readonly IDeliveryRepository _delrepo;

        public DeliveryService(IUnitOfWork unitOfWork, IWarehouseRepository warrepo,IDeliveryRepository delrepo)
        {
            this._unitOfWork = unitOfWork;
            this._warrepo = warrepo;
            this._delrepo = delrepo;
        }

        public async Task<List<DeliveryDto>> GetAllAsync()
        {
            var list = await this._delrepo.GetAllAsync();

            List<DeliveryDto> listDto = list.ConvertAll<DeliveryDto>(del => new DeliveryDto { Id = del.Id.AsString(), deliveryDate = del.deliveryDate, timeToPickup = del.timeToPickup, timeToPlace = del.timeToPlace, warehouseID = del.warehouseID, weight = del.weight  });

            return listDto;
        }

        public async Task<DeliveryDto> GetByIdAsync(DeliveryId Id)
        {
            var del = await this._delrepo.GetByIdAsync(Id);

            if (del == null)
                return null;

            return new DeliveryDto { Id = del.Id.AsString(), deliveryDate = del.deliveryDate, timeToPickup = del.timeToPickup, timeToPlace = del.timeToPlace, warehouseID = del.warehouseID, weight = del.weight };
        }

        public async Task<DeliveryDto> AddAsync(DeliveryDto dto)
        {
            await checkWarehouseIdAsync(new WarehouseId(dto.warehouseID));

            var del = new Delivery(dto.Id, dto.deliveryDate, dto.weight, dto.warehouseID, new System.DateTime(dto.deliveryDate.Year, dto.deliveryDate.Month, dto.deliveryDate.Day, dto.timeToPickup.Hour, dto.timeToPickup.Minute, 0), new System.DateTime(dto.deliveryDate.Year, dto.deliveryDate.Month, dto.deliveryDate.Day, dto.timeToPlace.Hour, dto.timeToPlace.Minute, 0));
            
            await this._delrepo.AddAsync(del);
            await this._unitOfWork.CommitAsync();
            
            return new DeliveryDto { Id = del.Id.AsString(), deliveryDate = del.deliveryDate, timeToPickup = del.timeToPickup, timeToPlace = del.timeToPlace, warehouseID = del.warehouseID, weight = del.weight };
            
            
            
        }

        public async Task<DeliveryDto> UpdateAsync(DeliveryDto dto)
        {
            

            var del = await this._delrepo.GetByIdAsync(new DeliveryId(dto.Id));
            

            if (del == null)
                return null;
            
            await checkWarehouseIdAsync(new WarehouseId(dto.warehouseID));

            del.ChangeDeliveryDate(dto.deliveryDate);
            del.ChangeWeight(dto.weight);
            del.ChangeWarehouseId(dto.warehouseID);
            del.ChangeTimeToPlace(dto.timeToPlace);
            del.ChangeTimeToPickup(dto.timeToPickup);
            
            await this._unitOfWork.CommitAsync();

            
            return new DeliveryDto { Id = del.Id.AsString(), deliveryDate = del.deliveryDate,  timeToPickup = new System.DateTime(del.timeToPickup.Year, del.timeToPickup.Month, del.timeToPickup.Day, del.timeToPickup.Hour, del.timeToPickup.Minute, 0), timeToPlace = new System.DateTime(del.timeToPlace.Year, del.timeToPlace.Month, del.timeToPlace.Day, del.timeToPlace.Hour, del.timeToPlace.Minute, 0), warehouseID = del.warehouseID, weight = del.weight };
                
            
            
        }
        private async Task checkWarehouseIdAsync(WarehouseId warId)
        {
            
        var list = await this._warrepo.GetByIdAsync(warId);
            
           if ( list == null)
                throw new BusinessRuleValidationException("Invalid Warehouse Id.");
        }
    }
}