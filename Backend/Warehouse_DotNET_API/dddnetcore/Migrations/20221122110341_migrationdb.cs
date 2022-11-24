using Microsoft.EntityFrameworkCore.Migrations;

using System;

#nullable disable

namespace DDDNetCore.Migrations
{
    public partial class migrationdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Deliveries");

            migrationBuilder.EnsureSchema(
                name: "Warehouses");

            migrationBuilder.CreateTable(
                name: "tblDeliveries",
                schema: "Deliveries",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DeliveryDate = table.Column<DateTime>(type: "date", nullable: false),
                    Weight = table.Column<double>(type: "float", nullable: false),
                    WarehouseID = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    TimeToPickup = table.Column<int>(type: "int", nullable: false),
                    TimeToPlace = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblDeliveries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblWarehouses",
                schema: "Warehouses",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Designation = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblWarehouses", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblDeliveries",
                schema: "Deliveries");

            migrationBuilder.DropTable(
                name: "tblWarehouses",
                schema: "Warehouses");
        }
    }
}
