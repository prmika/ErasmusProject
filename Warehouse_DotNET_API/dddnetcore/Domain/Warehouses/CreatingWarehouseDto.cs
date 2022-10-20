namespace DDDSample1.Domain.Warehouses
{
    public class CreatingWarehouseDto
    {
        public string ID { get; private set; }
        public string designaion { get; set; }
        public string address { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }



        public CreatingWarehouseDto(string id, string des, string add, double lat, double longt)
        {
            this.ID = id;
            this.designaion = des;
            this.address = add;
            this.latitude = lat;
            this.longitude = longt;
        }
    }
}