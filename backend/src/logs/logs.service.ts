import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { calculateTollFee } from './fee-calculator';
import { CreateLogDto } from './dto/create-log.dto';
import { FlagLogDto } from './dto/flag-log.dto';
import { TollLog, TollStatus } from './toll-log.model';

@Injectable()
export class LogsService {
  private readonly logs: TollLog[] = [
    {
      id: randomUUID(),
      licensePlate: 'ABC-1234',
      vehicleType: 'Car' as TollLog['vehicleType'],
      isOfficial: false,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      tollFee: 5.0,
      status: TollStatus.Paid,
      flagged: false,
    },
    {
      id: randomUUID(),
      licensePlate: 'GOV-0001',
      vehicleType: 'Truck' as TollLog['vehicleType'],
      isOfficial: true,
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      tollFee: 0,
      status: TollStatus.Paid,
      flagged: false,
    },
    {
      id: randomUUID(),
      licensePlate: 'MOTO-99',
      vehicleType: 'Motorcycle' as TollLog['vehicleType'],
      isOfficial: false,
      timestamp: new Date(Date.now() - 900000).toISOString(),
      tollFee: 2.0,
      status: TollStatus.Pending,
      flagged: false,
    },
  ];

  findAll(): TollLog[] {
    return [...this.logs].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }

  create(dto: CreateLogDto): TollLog {
    const isOfficial = dto.isOfficial ?? false;
    const tollFee = calculateTollFee(dto.vehicleType, isOfficial);
    const log: TollLog = {
      id: randomUUID(),
      licensePlate: dto.licensePlate.trim().toUpperCase(),
      vehicleType: dto.vehicleType,
      isOfficial,
      timestamp: new Date().toISOString(),
      tollFee,
      status: TollStatus.Pending,
      flagged: false,
    };
    this.logs.unshift(log);
    return log;
  }

  flag(id: string, dto: FlagLogDto): TollLog {
    const log = this.logs.find((entry) => entry.id === id);
    if (!log) {
      throw new NotFoundException(`Toll log ${id} not found`);
    }
    log.status = dto.status;
    log.flagged = dto.status === TollStatus.Violation;
    return log;
  }
}
