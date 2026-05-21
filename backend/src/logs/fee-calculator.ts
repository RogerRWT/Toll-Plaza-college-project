import { VehicleType } from './toll-log.model';

const BASE_FEES: Record<VehicleType, number> = {
  [VehicleType.Car]: 5.0,
  [VehicleType.Motorcycle]: 2.0,
  [VehicleType.Truck]: 10.0,
};

export function calculateTollFee(
  vehicleType: VehicleType,
  isOfficial: boolean,
): number {
  if (isOfficial) {
    return 0;
  }
  return BASE_FEES[vehicleType];
}
