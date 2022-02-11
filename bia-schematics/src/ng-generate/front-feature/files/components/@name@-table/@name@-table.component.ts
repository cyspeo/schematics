import { Component, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { BiaMessageService } from 'src/app/core/bia-core/services/bia-message.service';
import { BiaOptionService } from 'src/app/core/bia-core/services/bia-option.service';
import { BiaCalcTableComponent } from 'src/app/shared/bia-shared/components/table/bia-calc-table/bia-calc-table.component';
import { @Name@ } from '../../model/@name@';

@Component({
  selector: 'app-@name@-table',
  templateUrl: '../../../../shared/bia-shared/components/table/bia-calc-table/bia-calc-table.component.html',
  styleUrls: ['../../../../shared/bia-shared/components/table/bia-calc-table/bia-calc-table.component.scss']
})
export class @Name@TableComponent extends BiaCalcTableComponent implements OnChanges {

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public biaMessageService: BiaMessageService,
    public translateService: TranslateService
  ) {
    super(formBuilder, authService, biaMessageService, translateService);
  }

  public initForm() {
    this.form = this.formBuilder.group({
      id: [this.element.id], // This field is mandatory. Do not remove it.
      msn: [this.element.msn, Validators.required],
      isActive: [this.element.isActive],
      lastFlightDate: [this.element.lastFlightDate],
      deliveryDate: [this.element.deliveryDate],
      syncTime: [this.element.syncTime],
      capacity: [this.element.capacity, Validators.required],
      connectingAirports: [this.element.connectingAirports],
      @name@Type: [this.element.@name@Type?.id],
    });
  }

    onSubmit() {
    if (this.form.valid) {
      const @name@: @Name@ = <@Name@>this.form.value;
      @name@.id = @name@.id > 0 ? @name@.id : 0;
      @name@.isActive = @name@.isActive ? @name@.isActive : false;
      @name@.connectingAirports = BiaOptionService.Differential(@name@.connectingAirports, this.element?.connectingAirports);
      @name@.@name@Type = BiaOptionService.Clone(@name@.@name@Type);

      // force the parent key => siteId from authService or other Id from 'parent'Service
      @name@.siteId = this.authService.getCurrentSiteId(),
      this.save.emit(@name@);
      this.form.reset();
    }
  }
}
