using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWarehouseRepository _repo;

        public WarehouseService(IUnitOfWork unitOfWork, IWarehouseRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<WarehouseDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<WarehouseDto> listDto = list.ConvertAll<WarehouseDto>(war => new WarehouseDto { ID = war.ID, designaion = war.designaion, address = war.address, latitude = war.latitude, longitude = war.longitude });

            return listDto;
        }

        public async Task<WarehouseDto> GetByIdAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id);

            if (war == null)
                return null;

           return new WarehouseDto { ID = war.ID, designaion = war.designaion, address = war.address, latitude = war.latitude, longitude = war.longitude };
        }

        public async Task<WarehouseDto> AddAsync(CreatingWarehouseDto dto)
        {
            var war = new Warehouse(dto.ID, dto.designaion, dto.address, dto.latitude, dto.longitude);

            await this._repo.AddAsync(war);

            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { ID = war.ID, designaion = war.designaion, address = war.address, latitude = war.latitude, longitude = war.longitude };
        }

        public async Task<WarehouseDto> UpdateAsync(WarehouseDto dto)
        {
            var war = await this._repo.GetByIdAsync(new WarehouseId(dto.ID));

            if (war == null)
                return null;

            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { ID = war.ID, designaion = war.designaion, address = war.address, latitude = war.latitude, longitude = war.longitude };
        }

        public async Task<WarehouseDto> InactivateAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id);

            if (war == null)
                return null;



            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { ID = war.ID, designaion = war.designaion, address = war.address, latitude = war.latitude, longitude = war.longitude };
        }

        public async Task<WarehouseDto> DeleteAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id);

            if (war == null)
                return null;

            this._repo.Remove(war);
            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { ID = war.ID, designaion = war.designaion, address = war.address, latitude = war.latitude, longitude = war.longitude };
        }
    }
}