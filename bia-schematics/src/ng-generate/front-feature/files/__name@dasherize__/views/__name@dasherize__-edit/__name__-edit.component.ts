import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { update } from '../../store/<%= plurialname %>-actions';
import { Subscription } from 'rxjs';
import { <%= classify(name) %> } from '../../model/<%= name %>';
import { AppState } from 'src/app/store/state';
import { <%= classify(name) %>Service } from '../../services/<%= name %>.service';
import { ActivatedRoute, Router } from '@angular/router';
import { <%= classify(name) %>OptionsService } from '../../services/<%= name %>-options.service';
import { BiaTranslationService } from 'src/app/core/bia-core/services/bia-translation.service';

@Component({
  selector: 'app-<%= name %>-edit',
  templateUrl: './<%= name %>-edit.component.html',
  styleUrls: ['./<%= name %>-edit.component.scss']
})
export class <%= classify(name) %>EditComponent implements OnInit, OnDestroy {
  @Output() displayChange = new EventEmitter<boolean>();
  private sub = new Subscription();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public <%= name %>OptionsService: <%= classify(name) %>OptionsService,
    public <%= name %>Service: <%= classify(name) %>Service,
    private biaTranslationService: BiaTranslationService,
  ) { }

  ngOnInit() {
    this.sub.add(
      this.biaTranslationService.currentCulture$.subscribe(event => {
          this.<%= name %>OptionsService.loadAllOptions();
      })
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmitted(<%= name %>ToUpdate: <%= classify(name) %>) {
    this.store.dispatch(update({ <%= name %>: <%= name %>ToUpdate }));
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  onCancelled() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }
}
