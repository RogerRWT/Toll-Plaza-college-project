import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TollLog, TollStatus } from '../../models/toll-log.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @Input({ required: true }) logs: TollLog[] = [];
  @Input() loading = false;
  @Output() flagVehicle = new EventEmitter<TollLog>();

  readonly TollStatus = TollStatus;

  statusClass(status: TollStatus): string {
    return status.toLowerCase();
  }

  onFlag(log: TollLog): void {
    this.flagVehicle.emit(log);
  }
}
