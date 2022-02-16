import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { create } from '../../store/<%= plurialname %>-actions';
import { <%= classify(name) %> } from '../../model/<%= name %>';
import { AppState } from 'src/app/store/state';
import { <%= classify(name) %>OptionsService } from '../../services/<%= name %>-options.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BiaTranslationService } from 'src/app/core/bia-core/services/bia-translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-<%= name %>-new',
  templateUrl: './<%= name %>-new.component.html',
  styleUrls: ['./<%= name %>-new.component.scss']
})
export class <%= classify(name) %>NewComponent implements OnInit, OnDestroy  {
  private sub = new Subscription();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public <%= name %>OptionsService: <%= classify(name) %>OptionsService,
    private biaTranslationService: BiaTranslationService,

  ) {}

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

  onSubmitted(<%= name %>ToCreate: <%= classify(name) %>) {
    this.store.dispatch(create({ <%= name %>: <%= name %>ToCreate }));
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onCancelled() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
