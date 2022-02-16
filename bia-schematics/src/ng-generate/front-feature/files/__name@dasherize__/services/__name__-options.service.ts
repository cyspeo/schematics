import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAllAirportOptions } from 'src/app/domains/airport-option/store/airport-option.state';
import { loadAllAirportOptions } from 'src/app/domains/airport-option/store/airport-options-actions';
import { getAll<%= classify(name) %>TypeOptions } from 'src/app/domains/<%= name %>-type-option/store/<%= name %>-type-option.state';
import { loadAll<%= classify(name) %>TypeOptions } from 'src/app/domains/<%= name %>-type-option/store/<%= name %>-type-options-actions';
import { DictOptionDto } from 'src/app/shared/bia-shared/components/table/bia-table/dict-option-dto';
import { OptionDto } from 'src/app/shared/bia-shared/model/option-dto';
import { AppState } from 'src/app/store/state';

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>OptionsService {
    dictOptionDtos$: Observable<DictOptionDto[]>;

    <%= name %>TypeOptions$: Observable<OptionDto[]>;
    airportOptions$: Observable<OptionDto[]>;

    constructor(
        private store: Store<AppState>,
    ) {
        this.<%= name %>TypeOptions$ = this.store.select(getAll<%= classify(name) %>TypeOptions);
        this.airportOptions$ = this.store.select(getAllAirportOptions);

        // [Calc] Dict is used in calc mode only. It map the column name with the list OptionDto.
        this.dictOptionDtos$ = combineLatest([this.<%= name %>TypeOptions$, this.airportOptions$]).pipe(
            map(
                (options) =>
                <DictOptionDto[]>[
                    new DictOptionDto('<%= name %>Type', options[0]),
                    new DictOptionDto('connectingAirports', options[1])
                ]
            )
        );
    }

    loadAllOptions() {
        this.store.dispatch(loadAll<%= classify(name) %>TypeOptions());
        this.store.dispatch(loadAllAirportOptions());
    }
}
