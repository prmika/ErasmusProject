using DDDNetCore.Domain.Deliveries;
using DDDNetCore.Domain.Warehouses;
using DDDSample1.Domain.Deliveries;
using DDDSample1.Infrastructure.Deliveries;
using DDDSample1.Infrastructure.Warehouses;
using Microsoft.EntityFrameworkCore;

namespace DDDNetCore.Infrastructure
{
    public class BackendContext: DbContext
    {
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public BackendContext(DbContextOptions<BackendContext> dbContextOptions): base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new WarehouseEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DeliveryEntityTypeConfiguration());
        }

    }
}
