import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAll<%= classify(plurialname) %>, get<%= classify(plurialname) %>TotalCount, get<%= classify(name) %>LoadingGetAll } from '../../store/<%= classify(name) %>.state';
import { multiRemove, loadAllByPost, update, create } from '../../store/<%= classify(plurialname) %>-actions';
import { Observable, Subscription } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { <%= classify(name) %> } from '../../model/<%= classify(name) %>';
import { BiaTableComponent } from 'src/app/shared/bia-shared/components/table/bia-table/bia-table.component';
import {
  BiaListConfig,
  PrimeTableColumn,
  PropType,
  PrimeNGFiltering
} from 'src/app/shared/bia-shared/components/table/bia-table/bia-table-config';
import { AppState } from 'src/app/store/state';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/constants';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { <%= classify(name) %>Das } from '../../services/<%= classify(name) %>-das.service';
import * as FileSaver from 'file-saver';
import { TranslateService } from '@ngx-translate/core';
import { BiaTranslationService } from 'src/app/core/bia-core/services/bia-translation.service';
import { Permission } from 'src/app/shared/permission';
import { KeyValuePair } from 'src/app/shared/bia-shared/model/key-value-pair';
import { <%= classify(plurialname) %>SignalRService } from '../../services/<%= classify(name) %>-signalr.service';
import { <%= classify(plurialname) %>Effects } from '../../store/<%= classify(plurialname) %>-effects';
import { loadAllView } from 'src/app/shared/bia-shared/features/view/store/views-actions';
import { <%= classify(name) %>OptionsService } from '../../services/<%= classify(name) %>-options.service';
import { PagingFilterFormatDto } from 'src/app/shared/bia-shared/model/paging-filter-format';
import { <%= classify(name) %>TableComponent } from 'src/app/features/<%= name %>/components/<%= name %>-table/<%= name %>-table.component';

@Component({
  selector: 'app-<%= classify(plurialname) %>-index',
  templateUrl: './<%= classify(plurialname) %>-index.component.html',
  styleUrls: ['./<%= classify(plurialname) %>-index.component.scss']
})
export class <%= classify(plurialname) %>IndexComponent implements OnInit, OnDestroy {
  useCalcMode = false;
  useSignalR = false;
  useView = false;
  useRefreshAtLanguageChange = false;

  @HostBinding('class.bia-flex') flex = true;
  @ViewChild(BiaTableComponent, { static: false }) biaTableComponent: BiaTableComponent;
  @ViewChild(<%= classify(name) %>TableComponent, { static: false }) <%= classify(name) %>TableComponent: <%= classify(name) %>TableComponent;
  private get <%= classify(name) %>ListComponent() {
    if (this.biaTableComponent !== undefined) {
      return this.biaTableComponent;
    }
    return this.<%= classify(name) %>TableComponent;
  }

  private sub = new Subscription();
  showColSearch = false;
  globalSearchValue = '';
  defaultPageSize = DEFAULT_PAGE_SIZE;
  pageSize = this.defaultPageSize;
  totalRecords: number;
  <%= classify(plurialname) %>$: Observable<<%= classify(name) %>[]>;
  selected<%= classify(plurialname) %>: <%= classify(name) %>[];
  totalCount$: Observable<number>;
  loading$: Observable<boolean>;
  canEdit = false;
  canDelete = false;
  canAdd = false;
  tableConfiguration: BiaListConfig;
  columns: KeyValuePair[];
  displayedColumns: KeyValuePair[];
  viewPreference: string;
  popupTitle: string;
  tableStateKey = this.useView ? '<%= classify(plurialname) %>Grid' : undefined;
  parentIds: string[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private <%= classify(name) %>Das: <%= classify(name) %>Das,
    private translateService: TranslateService,
    private biaTranslationService: BiaTranslationService,
    private <%= classify(plurialname) %>SignalRService: <%= classify(plurialname) %>SignalRService,
    public <%= classify(name) %>OptionsService: <%= classify(name) %>OptionsService,
  ) {
  }

  ngOnInit() {
    this.parentIds = [];
    this.sub = new Subscription();

    this.initTableConfiguration();
    this.setPermissions();
    this.<%= classify(plurialname) %>$ = this.store.select(getAll<%= classify(plurialname) %>);
    this.totalCount$ = this.store.select(get<%= classify(plurialname) %>TotalCount);
    this.loading$ = this.store.select(get<%= classify(name) %>LoadingGetAll);
    this.OnDisplay();
    if (this.useCalcMode) {
      this.sub.add(
        this.biaTranslationService.currentCulture$.subscribe(event => {
            this.<%= classify(name) %>OptionsService.loadAllOptions();
        })
      );
    }
    if (this.useRefreshAtLanguageChange) {
      // Reload data if language change.
      let isinit = true;
      this.sub.add(
        this.biaTranslationService.currentCulture$.subscribe(event => {
            if (isinit) {
              isinit = false;
            } else {
              this.onLoadLazy(this.<%= classify(name) %>ListComponent.getLazyLoadMetadata());
            }
          })
      );
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.OnHide();
  }

  OnDisplay() {
    if (this.useView) {
      this.store.dispatch(loadAllView());
    }


    if (this.useSignalR) {
      this.<%= classify(plurialname) %>SignalRService.initialize();
      <%= classify(plurialname) %>Effects.useSignalR = true;
    }
  }

  OnHide() {
    if (this.useSignalR) {
      <%= classify(plurialname) %>Effects.useSignalR = false;
      this.<%= classify(plurialname) %>SignalRService.destroy();
    }
  }

  onCreate() {
    if (!this.useCalcMode) {
      this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
    }
  }

  onEdit(<%= classify(name) %>Id: number) {
    if (!this.useCalcMode) {
      this.router.navigate(['../' + <%= classify(name) %>Id + '/edit'], { relativeTo: this.activatedRoute });
    }
  }

  onSave(<%= classify(name) %>: <%= classify(name) %>) {
    if (this.useCalcMode) {
      if (<%= classify(name) %>?.id > 0) {
        if (this.canEdit) {
          this.store.dispatch(update({ <%= classify(name) %>: <%= name %> }));
        }
      } else {
        if (this.canAdd) {
          this.store.dispatch(create({ <%= classify(name) %>: <%= name %> }));
        }
      }
    }
  }

  onDelete() {
    if (this.selected<%= classify(plurialname) %> && this.canDelete) {
      this.store.dispatch(multiRemove({ ids: this.selected<%= classify(plurialname) %>.map((x) => x.id) }));
    }
  }

  onSelectedElementsChanged(<%= classify(plurialname) %>: <%= classify(name) %>[]) {
    this.selected<%= classify(plurialname) %> = <%= classify(plurialname) %>;
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
  }

  onLoadLazy(lazyLoadEvent: LazyLoadEvent) {
    const pagingAndFilter: PagingFilterFormatDto = { parentIds: this.parentIds, ...lazyLoadEvent };
    this.store.dispatch(loadAllByPost({ event: pagingAndFilter }));
  }

  searchGlobalChanged(value: string) {
    this.globalSearchValue = value;
  }

  displayedColumnsChanged(values: KeyValuePair[]) {
    this.displayedColumns = values;
  }

  onToggleSearch() {
    this.showColSearch = !this.showColSearch;
  }

  onViewChange(viewPreference: string) {
    this.viewPreference = viewPreference;
  }

  onExportCSV() {
    const columns: { [key: string]: string } = {};
    this.columns.map((x) => (columns[x.value.split('.')[1]] = this.translateService.instant(x.value)));
    const columnsAndFilter: PagingFilterFormatDto = {
      parentIds: this.parentIds, columns: columns, ...this.<%= classify(name) %>ListComponent.getLazyLoadMetadata()
    };
    this.<%= classify(name) %>Das.getFile(columnsAndFilter).subscribe((data) => {
      FileSaver.saveAs(data, this.translateService.instant('app.<%= classify(plurialname) %>') + '.csv');
    });
  }

  private setPermissions() {
    this.canEdit = this.authService.hasPermission(Permission.<%= classify(name) %>_Update);
    this.canDelete = this.authService.hasPermission(Permission.<%= classify(name) %>_Delete);
    this.canAdd = this.authService.hasPermission(Permission.<%= classify(name) %>_Create);
  }

  private initTableConfiguration() {
    this.biaTranslationService.currentCultureDateFormat$.subscribe((dateFormat) => {
      this.tableConfiguration = {
        columns: [
          new PrimeTableColumn('msn', '<%= classify(name) %>.msn'),
          Object.assign(new PrimeTableColumn('isActive', '<%= classify(name) %>.isActive'), {
            isSearchable: false,
            isSortable: false,
            type: PropType.Boolean
          }),
          Object.assign(new PrimeTableColumn('lastFlightDate', '<%= classify(name) %>.lastFlightDate'), {
            type: PropType.DateTime,
            formatDate: dateFormat.dateTimeFormat
          }),
          Object.assign(new PrimeTableColumn('deliveryDate', '<%= classify(name) %>.deliveryDate'), {
            type: PropType.Date,
            formatDate: dateFormat.dateFormat
          }),
          Object.assign(new PrimeTableColumn('syncTime', '<%= classify(name) %>.syncTime'), {
            type: PropType.TimeSecOnly,
            formatDate: dateFormat.timeFormatSec
          }),
          Object.assign(new PrimeTableColumn('capacity', '<%= classify(name) %>.capacity'), {
            type: PropType.Number,
            filterMode: PrimeNGFiltering.Equals
          }),
          Object.assign(new PrimeTableColumn('<%= classify(name) %>Type', '<%= classify(name) %>.<%= classify(name) %>Type'), {
            type: PropType.OneToMany
          }),
          Object.assign(new PrimeTableColumn('connectingAirports', '<%= classify(name) %>.connectingAirports'), {
            type: PropType.ManyToMany
          })
        ]
      };

      this.columns = this.tableConfiguration.columns.map((col) => <KeyValuePair>{ key: col.field, value: col.header });
      this.displayedColumns = [...this.columns];
    });
  }
}
