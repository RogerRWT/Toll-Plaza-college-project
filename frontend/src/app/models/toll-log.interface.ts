export enum VehicleType {
  Car = 'Car',
  Truck = 'Truck',
  Motorcycle = 'Motorcycle',
}

export enum TollStatus {
  Paid = 'Paid',
  Pending = 'Pending',
  Violation = 'Violation',
}

export interface TollLog {
  id: string;
  licensePlate: string;
  vehicleType: VehicleType;
  isOfficial: boolean;
  timestamp: string;
  tollFee: number;
  status: TollStatus;
  flagged: boolean;
}

export interface CreateTollLogRequest {
  licensePlate: string;
  vehicleType: VehicleType;
  isOfficial?: boolean;
}

export interface FlagTollLogRequest {
  status: TollStatus;
}
