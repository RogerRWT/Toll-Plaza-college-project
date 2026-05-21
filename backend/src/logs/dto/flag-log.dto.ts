import { IsEnum } from 'class-validator';
import { TollStatus } from '../toll-log.model';

export class FlagLogDto {
  @IsEnum(TollStatus)
  status!: TollStatus;
}
