using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using System.Web.Http.Cors;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WarehousesController : ControllerBase
    {
        private readonly WarehouseService _service;

        public WarehousesController(WarehouseService service)
        {
            _service = service;
        }

        // GET: api/Warehouses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WarehouseDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Warehouses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseDto>> GetGetById(string id)
        {
            var war = await _service.GetByIdAsync(new WarehouseId(id));

            if (war == null)
            {
                return NotFound();
            }

            return war;
        }

        // POST: api/Warehouses
        [HttpPost]
        public async Task<ActionResult<WarehouseDto>> Create(WarehouseDto dto)
        {
            
            var war = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { Id = war.Id }, war);
        }

        
        // PUT: api/Warehouses/5
        [HttpPut("{id}")]
        public async Task<ActionResult<WarehouseDto>> Update(string id, WarehouseDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var war = await _service.UpdateAsync(dto);
                
                if (war == null)
                {
                    return NotFound();
                }
                return Ok(war);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}