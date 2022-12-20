export interface ITruckPersistence {
    domainId: string;
    tare: Number;
    load_capacity: Number;
    max_battery_charge: Number;
    autonomy: Number;
    fast_charging_time: Number;
    status: Boolean
  }