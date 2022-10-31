using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using Newtonsoft.Json.Linq;



namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryRepository _repo;
        private readonly IWarehouseRepository _repoWar;

        public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo, IWarehouseRepository repoWarehouses)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoWar = repoWarehouses;
        }

        public async Task<List<DeliveryDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<DeliveryDto> listDto = list.ConvertAll<DeliveryDto>(deli => new DeliveryDto(deli.Id.AsString(), deli.deliveryDate, deli.weight,deli.warehouseID, deli.timeToPlace, deli.timeToPickup));

            return listDto;
        }

        public async Task<DeliveryDto> GetByIdAsync(DeliveryId id)
        {
            var deli = await this._repo.GetByIdAsync(id);

            if (deli == null)
                return null;

           return new DeliveryDto (deli.Id.AsString(), deli.deliveryDate,deli.weight, deli.warehouseID, deli.timeToPlace, deli.timeToPickup );
        }

        public async Task<DeliveryDto> AddAsync(CreatingDeliveryDto dto)
        {

           // await checkWarehouseIdAsync(dto.warehouseID);
            var deli = new Delivery(dto.Id, dto.deliveryDate, dto.weight, dto.warehouseID, dto.timeToPlace, dto.timeToPickup);

            await this._repo.AddAsync(deli);

            await this._unitOfWork.CommitAsync();

            return new DeliveryDto (deli.Id.AsString(), deli.deliveryDate, deli.weight, deli.warehouseID, deli.timeToPlace, deli.timeToPickup);
        }

        public async Task<DeliveryDto> UpdateAsync(DeliveryDto dto)
        {
            //await checkWarehouseIdAsync(dto.warehouseID); //does not work...
            var deli = await this._repo.GetByIdAsync(new DeliveryId(dto.Id));

            if (deli == null)
                return null;

           
            deli.ChangeDeliveryDate(dto.deliveryDate);
            deli.ChangeWeight(dto.weight);
            deli.ChangeWarehouseId(dto.warehouseID);
            deli.ChangeTimeToPlace(dto.timeToPlace);
            deli.ChangeTimeToPickup(dto.timeToPickup);

            await this._unitOfWork.CommitAsync();

            return new DeliveryDto(deli.Id.AsString(), deli.deliveryDate,deli.weight,  deli.warehouseID, deli.timeToPlace, deli.timeToPickup);
        }

        

        //this does not work...
        
        /*private async Task checkWarehouseIdAsync(string warId)
        {
            
        var list = await this._repoWar.GetAllAsync();
            
        var result = list.FindAll(element => element.Id.ToString().Contains(warId));

           if ( result == null)
                throw new BusinessRuleValidationException("Invalid Warehouse Id.");
        } */

        
        
    }
}