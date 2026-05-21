import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import {
  TollLog,
  TollStatus,
  VehicleType,
} from './models/toll-log.interface';
import { TollLogService } from './services/toll-log.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, DashboardComponent, EntryFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly allLogs = signal<TollLog[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly plateFilter = signal('');
  readonly typeFilter = signal<VehicleType | ''>('');

  readonly vehicleTypes = Object.values(VehicleType);

  readonly filteredLogs = computed(() => {
    const plate = this.plateFilter().trim().toLowerCase();
    const type = this.typeFilter();
    return this.allLogs().filter((log) => {
      const matchesPlate =
        !plate || log.licensePlate.toLowerCase().includes(plate);
      const matchesType = !type || log.vehicleType === type;
      return matchesPlate && matchesType;
    });
  });

  constructor(private readonly tollLogService: TollLogService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.loading.set(true);
    this.error.set(null);
    this.tollLogService.getLogs().subscribe({
      next: (logs) => {
        this.allLogs.set(logs);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(
          'Could not reach the API. Start the backend on http://localhost:3000',
        );
        this.loading.set(false);
      },
    });
  }

  onPlateFilterChange(value: string): void {
    this.plateFilter.set(value);
  }

  onTypeFilterChange(value: string): void {
    this.typeFilter.set(value as VehicleType | '');
  }

  onCreateEntry(payload: {
    licensePlate: string;
    vehicleType: VehicleType;
    isOfficial: boolean;
  }): void {
    this.tollLogService.createLog(payload).subscribe({
      next: (log) => {
        this.allLogs.update((logs) => [log, ...logs]);
      },
      error: () => {
        this.error.set('Failed to record vehicle entry.');
      },
    });
  }

  onFlagVehicle(log: TollLog): void {
    this.tollLogService
      .flagLog(log.id, { status: TollStatus.Violation })
      .subscribe({
        next: (updated) => {
          this.allLogs.update((logs) =>
            logs.map((entry) => (entry.id === updated.id ? updated : entry)),
          );
        },
        error: () => {
          this.error.set('Failed to flag vehicle.');
        },
      });
  }
}
