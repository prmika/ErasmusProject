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

            List<WarehouseDto> listDto = list.ConvertAll<WarehouseDto>(war => new WarehouseDto { Id = war.Id.AsString(), Designation = war.Designation, Address = war.Address, Latitude = war.Latitude, Longitude = war.Longitude });

            return listDto;
        }

        public async Task<WarehouseDto> GetByIdAsync(WarehouseId Id)
        {
            var war = await this._repo.GetByIdAsync(Id);

            if (war == null)
                return null;

           return new WarehouseDto { Id = war.Id.AsString(), Designation = war.Designation, Address = war.Address, Latitude = war.Latitude, Longitude = war.Longitude };
        }

        public async Task<WarehouseDto> AddAsync(WarehouseDto dto)
        {
            var war = new Warehouse(dto.Id, dto.Designation, dto.Address, dto.Latitude, dto.Longitude);

            await this._repo.AddAsync(war);

            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { Id = war.Id.AsString(), Designation = war.Designation, Address = war.Address, Latitude = war.Latitude, Longitude = war.Longitude };
        }

        public async Task<WarehouseDto> UpdateAsync(WarehouseDto dto)
        {
            var war = await this._repo.GetByIdAsync(new WarehouseId(dto.Id));

            if (war == null)
                return null;

            war.ChangeDesignation(dto.Designation);
            war.ChangeAddress(dto.Address);
            war.ChangeLat(dto.Latitude);
            war.ChangeLong(dto.Longitude);

            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { Id = war.Id.AsString(),  Designation = war.Designation, Address = war.Address, Latitude = war.Latitude, Longitude = war.Longitude };
        }

    }
}