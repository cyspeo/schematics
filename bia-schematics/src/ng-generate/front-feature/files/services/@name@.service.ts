import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/state';
import { @Name@ } from '../model/@name@';
import { getCurrent@Name@, get@Name@LoadingGet } from '../store/@name@.state';
import { load } from '../store/@plurialname@-actions';

@Injectable({
    providedIn: 'root'
})
export class @Name@Service {
    constructor(
        private store: Store<AppState>,
    ) {
        this.InitSub();
        this.loading$ = this.store.select(get@Name@LoadingGet);
        this.@name@$ = this.store.select(getCurrent@Name@);
    }
    private _current@Name@: @Name@;
    private _current@Name@Id: number;
    private sub = new Subscription();
    public loading$: Observable<boolean>;
    public @name@$: Observable<@Name@>;

    public get current@Name@() {
        if (this._current@Name@?.id === this._current@Name@Id) {
            return this._current@Name@;
        } else {
            return null;
        }
    }

    public get current@Name@Id(): number {
        return this._current@Name@Id;
    }
    public set current@Name@Id(id: number) {
        this._current@Name@Id = Number(id);
        this.store.dispatch(load({ id: id }));
    }

    InitSub() {
        this.sub = new Subscription();
        this.sub.add(
            this.store.select(getCurrent@Name@).subscribe((@name@) => {
                if (@name@) {
                    this._current@Name@ = @name@;
                }
            })
        );
    }
}
