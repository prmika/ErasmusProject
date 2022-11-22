using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDNetCore.Domain.Deliveries;

namespace DDDSample1.Infrastructure.Deliveries
{
    internal class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            builder.ToTable("tblDeliveries", "Deliveries")
                .HasKey(x => x.Id);

            builder.Property(x => x.DeliveryDate)
                .IsRequired()
                .HasColumnType("date");

            builder.Property(x => x.Weight)
                .IsRequired()
                .HasColumnType("float");

            builder.Property(x => x.WarehouseID)
                .IsRequired()
                .HasColumnType("nvarchar")
                .HasMaxLength(10);

            builder.Property(x => x.TimeToPlace)
                .IsRequired()
                .HasColumnType("int");

            builder.Property(x => x.TimeToPickup)
                .IsRequired()
                .HasColumnType("int");
        }
    }
}