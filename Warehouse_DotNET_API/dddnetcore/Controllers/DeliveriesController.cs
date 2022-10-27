using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Deliveries;

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
        public async Task<ActionResult<DeliveryDto>> GetGetById(Guid id)
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
        public async Task<ActionResult<DeliveryDto>> Create(CreatingDeliveryDto dto)
        {
            var deli = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = deli.Id }, deli);
        }

        
        // PUT: api/Deliveries/5
        [HttpPut("{id}")]
        public async Task<ActionResult<DeliveryDto>> Update(Guid id, DeliveryDto dto)
        {
            if (id != dto.Id)
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

        // Inactivate: api/Deliveries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DeliveryDto>> SoftDelete(Guid id)
        {
            var deli = await _service.InactivateAsync(new DeliveryId(id));

            if (deli == null)
            {
                return NotFound();
            }

            return Ok(deli);
        }
        
        // DELETE: api/Deliveries/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<DeliveryDto>> HardDelete(Guid id)
        {
            try
            {
                var deli = await _service.DeleteAsync(new DeliveryId(id));

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