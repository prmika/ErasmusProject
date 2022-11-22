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

        
    }
}