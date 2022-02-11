import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCurrent@Name@} from '../../store/@name@.state';
import { @Name@ } from '../../model/@name@';
import { AppState } from 'src/app/store/state';
import { ActivatedRoute } from '@angular/router';
import { @Name@Service } from '../../services/@name@.service';
import { BiaClassicLayoutService } from 'src/app/shared/bia-shared/components/layout/classic-layout/bia-classic-layout.service';
import { first } from 'rxjs/operators';
import { BiaTranslationService } from 'src/app/core/bia-core/services/bia-translation.service';

@Component({
  templateUrl: './@name@-item.component.html',
  styleUrls: ['./@name@-item.component.scss']
})
export class @Name@ItemComponent implements OnInit, OnDestroy {
  @name@$: Observable<@Name@>;
  private sub = new Subscription();

  constructor(private store: Store<AppState>,
    private route: ActivatedRoute,
    public @name@Service: @Name@Service,
    private layoutService: BiaClassicLayoutService,
    private biaTranslationService: BiaTranslationService,
  ) { }

  ngOnInit() {
    this.sub.add(
      this.biaTranslationService.currentCulture$.subscribe(event => {
        this.@name@Service.current@Name@Id = this.route.snapshot.params.@name@Id;
      })
    );
    this.sub.add
      (
        this.store.select(getCurrent@Name@).subscribe((@name@) => {
          if (@name@?.msn) {
            this.route.data.pipe(first()).subscribe(routeData => {
              routeData['breadcrumb'] = @name@.msn;
            });
            this.layoutService.refreshBreadcrumb();
          }
        })
      );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
