export interface IDeliveryPathPersistence {
    domainId: string,
    departure_warehouseId: string;
    destination_warehouseId: string;
    distance: Number;
    time: Number;
    used_battery: Number;
    extra_time_when_charging_required: Number;
  }