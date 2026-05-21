import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VehicleType } from '../../models/toll-log.interface';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.scss',
})
export class EntryFormComponent {
  @Output() submitEntry = new EventEmitter<{
    licensePlate: string;
    vehicleType: VehicleType;
    isOfficial: boolean;
  }>();

  readonly vehicleTypes = Object.values(VehicleType);
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      licensePlate: ['', [Validators.required, Validators.minLength(2)]],
      vehicleType: [VehicleType.Car, Validators.required],
      isOfficial: [false],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { licensePlate, vehicleType, isOfficial } = this.form.getRawValue();
    this.submitEntry.emit({ licensePlate, vehicleType, isOfficial });
    this.form.reset({
      licensePlate: '',
      vehicleType: VehicleType.Car,
      isOfficial: false,
    });
  }
}
