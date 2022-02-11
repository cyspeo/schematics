import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { BiaOptionService } from 'src/app/core/bia-core/services/bia-option.service';
import { OptionDto } from 'src/app/shared/bia-shared/model/option-dto';
import { @Name@ } from '../../model/@name@';

@Component({
  selector: 'app-@name@-form',
  templateUrl: './@name@-form.component.html',
  styleUrls: ['./@name@-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class @Name@FormComponent implements OnChanges {
  @Input() @name@: @Name@ = <@Name@>{};
  @Input() airportOptions: OptionDto[];
  @Input() @name@TypeOptions: OptionDto[];

  @Output() save = new EventEmitter<@Name@>();
  @Output() cancel = new EventEmitter();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private authService: AuthService) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.@name@) {
      this.form.reset();
      if (this.@name@) {
        this.form.patchValue({ ...this.@name@ });
      }
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [this.@name@.id],
      msn: [this.@name@.msn, Validators.required],
      isActive: [this.@name@.isActive],
      lastFlightDate: [this.@name@.lastFlightDate],
      deliveryDate: [this.@name@.deliveryDate],
      syncTime: [this.@name@.syncTime],
      capacity: [this.@name@.capacity, Validators.required],
      connectingAirports: [this.@name@.connectingAirports],
      @name@Type: [this.@name@.@name@Type?.id],
    });

  }

  onCancel() {
    this.form.reset();
    this.cancel.next();
  }

  onSubmit() {
    if (this.form.valid) {
      const @name@: @Name@ = <@Name@>this.form.value;
      @name@.id = @name@.id > 0 ? @name@.id : 0;
      @name@.isActive = @name@.isActive ? @name@.isActive : false;
      @name@.connectingAirports = BiaOptionService.Differential(@name@.connectingAirports, this.@name@?.connectingAirports);
      @name@.@name@Type = BiaOptionService.Clone(@name@.@name@Type);

      // force the parent key => siteId from authService or other Id from 'parent'Service
      @name@.siteId = this.authService.getCurrentSiteId(),
      this.save.emit(@name@);
      this.form.reset();
    }
  }
}

