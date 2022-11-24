using DDDNetCore.Domain.Warehouses;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Warehouses;
using DDDSample1.Infrastructure.Deliveries;
using Microsoft.Extensions.DependencyInjection;
using DDDNetCore.Domain.Deliveries;
using DDDSample1.Domain.Deliveries;

namespace DDDNetCore.Infrastructure.Extensions
{
    public static class Registrator
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IWarehouseService,WarehouseService>();
            services.AddScoped<IDeliveryService,DeliveryService>();
            return services;
        }

        public static IServiceCollection RegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<IWarehouseRepository, WarehouseRepository>();
            services.AddScoped<IDeliveryRepository, DeliveryRepository>();
            return services;
        }

        public static IServiceCollection RegisterUnitOfWorks(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            return services;
        }
    }
}
