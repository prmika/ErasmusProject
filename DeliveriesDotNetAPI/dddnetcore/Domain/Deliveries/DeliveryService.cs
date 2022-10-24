using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryRepository _repo;

        public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<DeliveryDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<DeliveryDto> listDto = list.ConvertAll<DeliveryDto>(deli => new DeliveryDto(deli.Id.AsGuid(),deli.deliveryDate, deli.weight,deli.warehouseID, deli.timeToPlace, deli.timeToPickup));

            return listDto;
        }

        public async Task<DeliveryDto> GetByIdAsync(DeliveryId id)
        {
            var deli = await this._repo.GetByIdAsync(id);

            if (deli == null)
                return null;

           return new DeliveryDto (deli.Id.AsGuid(), deli.deliveryDate,deli.weight, deli.warehouseID, deli.timeToPlace, deli.timeToPickup );
        }

        public async Task<DeliveryDto> AddAsync(CreatingDeliveryDto dto)
        {
            var deli = new Delivery(dto.deliveryDate, dto.weight, dto.warehouseID, dto.timeToPlace, dto.timeToPickup);

            await this._repo.AddAsync(deli);

            await this._unitOfWork.CommitAsync();

            return new DeliveryDto (deli.Id.AsGuid(),deli.deliveryDate, deli.weight, deli.warehouseID, deli.timeToPlace, deli.timeToPickup);
        }

        public async Task<DeliveryDto> UpdateAsync(DeliveryDto dto)
        {
            var deli = await this._repo.GetByIdAsync(new DeliveryId(dto.Id));

            if (deli == null)
                return null;

            deli.ChangeDeliveryDate(dto.deliveryDate);
            deli.ChangeWeight(dto.weight);
            deli.ChangeWarehouseId(dto.warehouseID);
            deli.ChangeTimeToPlace(dto.timeToPlace);
            deli.ChangeTimeToPickup(dto.timeToPickup);

            await this._unitOfWork.CommitAsync();

            return new DeliveryDto(deli.Id.AsGuid(), deli.deliveryDate,deli.weight,  deli.warehouseID, deli.timeToPlace, deli.timeToPickup);
        }

        public async Task<DeliveryDto> InactivateAsync(DeliveryId id)
        {
            var deli = await this._repo.GetByIdAsync(id);

            if (deli == null)
                return null;



            await this._unitOfWork.CommitAsync();

            return new DeliveryDto(deli.Id.AsGuid(), deli.deliveryDate,deli.weight, deli.warehouseID, deli.timeToPlace,  deli.timeToPickup );
        }

        public async Task<DeliveryDto> DeleteAsync(DeliveryId id)
        {
            var deli = await this._repo.GetByIdAsync(id);

            if (deli == null)
                return null;

            this._repo.Remove(deli);
            await this._unitOfWork.CommitAsync();

            return new DeliveryDto(deli.Id.AsGuid(), deli.deliveryDate, deli.weight,deli.warehouseID,  deli.timeToPlace, deli.timeToPickup);
        }
        /*
        private async Task checkCategoryIdAsync(WarehouseId warehouseId)
        {
           var war = await _repoCat.GetByIdAsync(warehouseId);
           if (war == null)
                throw new BusinessRuleValidationException("Invalid Warehouse Id.");
        }
        */
    }
}