import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { FlagLogDto } from './dto/flag-log.dto';
import { LogsService } from './logs.service';
import { TollLog } from './toll-log.model';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  findAll(): TollLog[] {
    return this.logsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateLogDto): TollLog {
    return this.logsService.create(dto);
  }

  @Patch(':id/flag')
  flag(@Param('id') id: string, @Body() dto: FlagLogDto): TollLog {
    return this.logsService.flag(id, dto);
  }
}
