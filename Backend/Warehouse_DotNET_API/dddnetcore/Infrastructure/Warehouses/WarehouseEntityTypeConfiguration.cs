using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Diagnostics;
using DDDNetCore.Domain.Warehouses;

namespace DDDSample1.Infrastructure.Warehouses
{
    internal class WarehouseEntityTypeConfiguration : IEntityTypeConfiguration<Warehouse>
    {
        public void Configure(EntityTypeBuilder<Warehouse> builder)
        {
            builder.ToTable("tblWarehouses","Warehouses")
                .HasKey(x => x.Id);

            builder.Property(x => x.Address)
                .IsRequired()
                .HasColumnType("nvarchar")
                .HasMaxLength(50);

            builder.Property(x => x.Designation)
                .IsRequired()
                .HasColumnType("nvarchar")
                .HasMaxLength(50);

            builder.Property(x => x.Latitude)
                .IsRequired()
                .HasColumnType("float");

            builder.Property(x => x.Longitude)
                .IsRequired()
                .HasColumnType("float");


            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}