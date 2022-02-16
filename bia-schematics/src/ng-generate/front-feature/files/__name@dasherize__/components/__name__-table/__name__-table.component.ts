import { Component, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { BiaMessageService } from 'src/app/core/bia-core/services/bia-message.service';
import { BiaOptionService } from 'src/app/core/bia-core/services/bia-option.service';
import { BiaCalcTableComponent } from 'src/app/shared/bia-shared/components/table/bia-calc-table/bia-calc-table.component';
import { <%=classify(name)%> } from '../../model/<%=name%>';

@Component({
  selector: 'app-<%=name%>-table',
  templateUrl: '../../../../shared/bia-shared/components/table/bia-calc-table/bia-calc-table.component.html',
  styleUrls: ['../../../../shared/bia-shared/components/table/bia-calc-table/bia-calc-table.component.scss']
})
export class <%=classify(name)%>TableComponent extends BiaCalcTableComponent implements OnChanges {

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
      name: [this.element.msn, Validators.required],
    });
  }

    onSubmit() {
    if (this.form.valid) {
      const <%=name%>: <%=classify(name)%> = <<%=classify(name)%>>this.form.value;
      <%=name%>.id = <%=name%>.id > 0 ? <%=name%>.id : 0;

      // force the parent key => siteId from authService or other Id from 'parent'Service
      this.save.emit(<%=name%>);
      this.form.reset();
    }
  }
}
