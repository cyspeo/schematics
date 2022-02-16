import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/state';
import { <%= classify(name) %> } from '../model/<%= name %>';
import { getCurrent<%= classify(name) %>, get<%= classify(name) %>LoadingGet } from '../store/<%= name %>.state';
import { load } from '../store/<%= plurialname %>-actions';

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>Service {
    constructor(
        private store: Store<AppState>,
    ) {
        this.InitSub();
        this.loading$ = this.store.select(get<%= classify(name) %>LoadingGet);
        this.<%= name %>$ = this.store.select(getCurrent<%= classify(name) %>);
    }
    private _current<%= classify(name) %>: <%= classify(name) %>;
    private _current<%= classify(name) %>Id: number;
    private sub = new Subscription();
    public loading$: Observable<boolean>;
    public <%= name %>$: Observable<<%= classify(name) %>>;

    public get current<%= classify(name) %>() {
        if (this._current<%= classify(name) %>?.id === this._current<%= classify(name) %>Id) {
            return this._current<%= classify(name) %>;
        } else {
            return null;
        }
    }

    public get current<%= classify(name) %>Id(): number {
        return this._current<%= classify(name) %>Id;
    }
    public set current<%= classify(name) %>Id(id: number) {
        this._current<%= classify(name) %>Id = Number(id);
        this.store.dispatch(load({ id: id }));
    }

    InitSub() {
        this.sub = new Subscription();
        this.sub.add(
            this.store.select(getCurrent<%= classify(name) %>).subscribe((<%= name %>) => {
                if (<%= name %>) {
                    this._current<%= classify(name) %> = <%= name %>;
                }
            })
        );
    }
}
