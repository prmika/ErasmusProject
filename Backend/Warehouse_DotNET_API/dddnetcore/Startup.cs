using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Warehouses;
using DDDSample1.Infrastructure.Deliveries;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;
using DDDSample1.Domain.Deliveries;
using DDDNetCore.Infrastructure;
using DDDNetCore.Infrastructure.Extensions;

namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<BackendContext>(options => options.UseSqlServer("name=ConnectionStrings:Prega"));

            //ConfigureMyServices(services);

            services.RegisterServices();
            services.RegisterRepositories();
            services.RegisterUnitOfWorks();
            services.AddControllers().AddNewtonsoftJson();
            
      
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x.WithOrigins(Configuration.GetSection("AllowedOrigins").Value.Split(","))
                  .AllowCredentials().WithHeaders(Configuration.GetSection("AllowedHeaders").Value.Split(","))
                  .WithMethods(Configuration.GetSection("AllowedMethods").Value.Split(",")));

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

        }
    }
}
