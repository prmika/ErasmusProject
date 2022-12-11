using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Domain.Shared;
using DDDNetCore.Infrastructure;
using DDDNetCore.Domain.Deliveries;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Web.Http.Cors;
using System.Linq;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DeliveriesController : ControllerBase
    {
        private BackendContext _context;
        private  IDeliveryService deliveryService;
        
        
        public DeliveriesController(BackendContext context, IDeliveryService deliveryService)
        {
            this._context = context;
            this.deliveryService = deliveryService;
        }

        [HttpGet]
        public ActionResult ReadAll()
        {
            var result = deliveryService.GetAllDeliveries();

            if (result.Any() == false)
            {
                return NotFound("No deliveries could be found");
            }
            return Ok(result);
        }

        [HttpGet("paged")]
        public ActionResult ReadAllPaged(int page, int amount)
        {
            var result = deliveryService.GetAllDeliveriesPaged(page, amount);

            if (result.Any() == false)
            {
                return NotFound("No deliveries could be found");
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult ReadOne(string id)
        {
            var result = deliveryService.GetOneDelivery(id);

            if (result == null)
            {
                return NotFound($"No delivery with id {id} could be found");
            }
            return Ok(result);
        }

        [HttpPost]
        public ActionResult<DeliveryDto> Post([FromBody] DeliveryDto delivery)
        {
            deliveryService.AddDelivery(delivery);
            return Ok(delivery);
        }

        [HttpPut("{id}")]
        public ActionResult<DeliveryDto> Put(string id, [FromBody] DeliveryDto delivery)
        {
            if ( id != delivery.Id)
            {
                return BadRequest("Id of url doesn't match with the id of the delivery data that was sent to be updated.");
            }

            try
            {
                deliveryService.UpdateDelivery(delivery);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            return Ok(delivery);
        }
       

        //// GET: api/Deliveries
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetAll()
        //{
        //    return await _service.GetAllAsync();
        //}

        //// GET: api/Deliveries/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<DeliveryDto>> GetGetById(string id)
        //{
        //    var deli = await _service.GetByIdAsync(new DeliveryId(id));

        //    if (deli == null)
        //    {
        //        return NotFound();
        //    }

        //    return deli;
        //}

        //// POST: api/Deliveries
        //[HttpPost]
        //public async Task<ActionResult<DeliveryDto>> Create(DeliveryDto dto)
        //{

        //    //var deli = await _service.AddAsync(dto);
        //    var deli = "";

        //    if (deli != null)
        //    {
        //        //return CreatedAtAction(nameof(GetGetById), new { Id = deli.Id }, deli);
        //        return BadRequest();
        //    }
        //    else
        //    {
        //        return BadRequest("WarehouseId is not valid! Make sure the Warehouse exists.");
        //    }
        //}

        
        //// PUT: api/Deliveries/5
        //[HttpPut("{id}")]
        //public async Task<ActionResult<DeliveryDto>> Update(string id, DeliveryDto dto)
        //{
            
        //    if (id!= dto.Id)
        //    {
        //        return BadRequest();
        //    }

        //    try
        //    {
        //        var deli = await _service.UpdateAsync(dto);
                
        //        if (deli == null)
        //        {
        //            return NotFound();
        //        }
        //        return Ok(deli);
        //    }
        //    catch(BusinessRuleValidationException ex)
        //    {
        //        return BadRequest(new {Message = ex.Message});
        //    }
        //}

        
        
       
    }
}