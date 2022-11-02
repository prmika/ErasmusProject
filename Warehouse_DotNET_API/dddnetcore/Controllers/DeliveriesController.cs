using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveriesController : ControllerBase
    {
        private readonly DeliveryService _service;
        
        

        public DeliveriesController(DeliveryService service)
        {
            _service = service;
        }
       

        // GET: api/Deliveries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Deliveries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDto>> GetGetById(string id)
        {
            var deli = await _service.GetByIdAsync(new DeliveryId(id));

            if (deli == null)
            {
                return NotFound();
            }

            return deli;
        }

        // POST: api/Deliveries
        [HttpPost]
        public async Task<ActionResult<DeliveryDto>> Create(DeliveryDto dto)
        {

            var deli = await _service.AddAsync(dto);

            if (deli != null)
            {
                return CreatedAtAction(nameof(GetGetById), new { Id = deli.Id }, deli);
            }
            else
            {
                return BadRequest("WarehouseId is not valid! Make sure the Warehouse exists.");
            }
        }

        
        // PUT: api/Deliveries/5
        [HttpPut("{id}")]
        public async Task<ActionResult<DeliveryDto>> Update(string id, DeliveryDto dto)
        {
            
            if (id!= dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var deli = await _service.UpdateAsync(dto);
                
                if (deli == null)
                {
                    return NotFound();
                }
                return Ok(deli);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        
        
       
    }
}