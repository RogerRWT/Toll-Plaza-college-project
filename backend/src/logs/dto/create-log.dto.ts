import { IsBoolean, IsEnum, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { VehicleType } from '../toll-log.model';

export class CreateLogDto {
  @IsString()
  @MinLength(2)
  @Matches(/^[A-Za-z0-9\s-]+$/, {
    message: 'licensePlate must contain only letters, numbers, spaces, or hyphens',
  })
  licensePlate!: string;

  @IsEnum(VehicleType)
  vehicleType!: VehicleType;

  @IsOptional()
  @IsBoolean()
  isOfficial?: boolean;
}
