using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Shared
{
    public interface IUnitOfWork
    {
        public int Commit();

        public IWarehouseRepository WarehouseRepository { get; }
        //public IDeliveryRepository DeliveryRepository { get; }
    }
}