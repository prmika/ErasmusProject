using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using System.Web.Http.Cors;
using DDDNetCore.Infrastructure;
using DDDNetCore.Domain.Warehouses;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Linq;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WarehousesController : ControllerBase
    {

        private BackendContext _context;
        private IWarehouseService warehouseService;

        public WarehousesController(BackendContext context, IWarehouseService warehouseService)
        {
            this._context = context;
            this.warehouseService = warehouseService;
        }

        [HttpGet]
        public ActionResult ReadAll()
        {
            var result = warehouseService.GetAllWarehouses();

            if (result.Any() == false)
            {
                return NotFound("No warehouses could be found");
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult ReadOne(string id)
        {
            var result = warehouseService.GetOneWarehouse(id);

            if (result == null)
            {
                return NotFound($"No warehouse with id {id} could be found");
            }
            return Ok(result);
        }

        [HttpPost]
        public ActionResult<WarehouseDto> Post([FromBody] WarehouseDto warehouse)
        {
            warehouseService.AddWarehouse(warehouse);
            return Ok(warehouse);
        }

        [HttpPut("{id}")]
        public ActionResult<WarehouseDto> Put(string id, [FromBody] WarehouseDto warehouse)
        {
            if ( id != warehouse.Id)
            {
                return BadRequest("Id of url doesn't match with the id of the warehouse data that was sent to be updated.");
            }

            try
            {
                warehouseService.UpdateWarehouse(warehouse);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            return Ok(warehouse);
        }

    }
}