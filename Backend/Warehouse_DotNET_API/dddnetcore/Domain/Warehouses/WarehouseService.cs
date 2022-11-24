﻿using DDDNetCore.Infrastructure;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DDDNetCore.Domain.Warehouses
{
    public class WarehouseService: IWarehouseService
    {
        private IUnitOfWork _unitOfWork;

        public WarehouseService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public List<Warehouse> GetAllWarehouses()
        {
            return _unitOfWork.WarehouseRepository.GetAll().ToList();
        }

        public Warehouse GetOneWarehouse(string id)
        {
            return _unitOfWork.WarehouseRepository.GetById(id);
        }

        public Warehouse AddWarehouse(WarehouseDto warehouse)
        {
            Warehouse warehouseToCreate = new Warehouse(warehouse.Id, warehouse.Designation, warehouse.Address, warehouse.Latitude, warehouse.Longitude);
            _unitOfWork.WarehouseRepository.Create(warehouseToCreate);
            _unitOfWork.Commit();
            return warehouseToCreate;
        }

        public Warehouse UpdateWarehouse(WarehouseDto warehouse)
        {
            Warehouse warehouseToUpdate = new Warehouse(warehouse.Id, warehouse.Designation, warehouse.Address, warehouse.Latitude, warehouse.Longitude);
            _unitOfWork.WarehouseRepository.Update(warehouseToUpdate);
            _unitOfWork.Commit();
            return warehouseToUpdate;
        }

    }
}
