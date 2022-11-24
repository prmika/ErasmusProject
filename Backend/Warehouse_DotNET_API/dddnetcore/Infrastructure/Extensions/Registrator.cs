using DDDNetCore.Domain.Warehouses;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Warehouses;
using Microsoft.Extensions.DependencyInjection;

namespace DDDNetCore.Infrastructure.Extensions
{
    public static class Registrator
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IWarehouseService,WarehouseService>();
            return services;
        }

        public static IServiceCollection RegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<IWarehouseRepository, WarehouseRepository>();
            return services;
        }

        public static IServiceCollection RegisterUnitOfWorks(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            return services;
        }
    }
}
