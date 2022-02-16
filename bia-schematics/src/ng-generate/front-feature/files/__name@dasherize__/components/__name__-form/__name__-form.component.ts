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
import { <%=classify(name)%> } from '../../model/<%= name %>';

@Component({
  selector: 'app-<%=name%>-form',
  templateUrl: './<%=name%>-form.component.html',
  styleUrls: ['./<%=name%>-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class <%= classify(name) %>FormComponent implements OnChanges {
  @Input() <%=name%>: <%=classify(name)%> = <<%=classify(name)%>>{};
  @Input() airportOptions: OptionDto[];
  @Input() <%=name%>TypeOptions: OptionDto[];

  @Output() save = new EventEmitter<<%=classify(name)%>>();
  @Output() cancel = new EventEmitter();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private authService: AuthService) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.<%=name%>) {
      this.form.reset();
      if (this.<%=name%>) {
        this.form.patchValue({ ...this.<%=name%> });
      }
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [this.<%=name%>.id],
      msn: [this.<%=name%>.name, Validators.required],
    });

  }

  onCancel() {
    this.form.reset();
    this.cancel.next();
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

