using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using DDDNetCore.Infrastructure;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private BackendContext _backendContext;
        private IWarehouseRepository _warehouseRepository;
        //private IDeliveryRepository _deliveryRepository;

        public UnitOfWork(BackendContext backendContext, IWarehouseRepository warehouseRepository/*, IDeliveryRepository deliveryRepository*/)
        {
            _backendContext = backendContext;
            _warehouseRepository = warehouseRepository;
            //_deliveryRepository = deliveryRepository;
        }

        public IWarehouseRepository WarehouseRepository
        {
            get { return _warehouseRepository; }
        }

        //public IDeliveryRepository DeliveryRepository
        //{
        //    get { return _deliveryRepository; }
        //}

        public int Commit()
        {
            return _backendContext.SaveChanges();
        }
    }
}