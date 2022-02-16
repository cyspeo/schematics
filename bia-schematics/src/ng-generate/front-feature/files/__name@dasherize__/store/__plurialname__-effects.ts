import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, pluck, switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  create,
  failure,
  load,
  loadAllByPost,
  loadAllByPostSuccess,
  loadSuccess,
  remove,
  multiRemove,
  update
} from './<%= plurialname %>-actions';
import { <%= classify(name) %>Das } from '../services/<%= name %>-das.service';
import { Store } from '@ngrx/store';
import { getLastLazyLoadEvent } from './<%= name %>.state';
import { <%= classify(name) %> } from '../model/<%= name %>';
import { DataResult } from 'src/app/shared/bia-shared/model/data-result';
import { AppState } from 'src/app/store/state';
import { BiaMessageService } from 'src/app/core/bia-core/services/bia-message.service';
import { LazyLoadEvent } from 'primeng/api';
import { biaSuccessWaitRefreshSignalR } from 'src/app/core/bia-core/shared/bia-action';

/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class <%= classify(plurialname) %>Effects {
  static useSignalR = false;
  loadAllByPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllByPost),
      pluck('event'),
      switchMap((event) =>
        this.<%= name %>Das.getListByPost(event).pipe(
          map((result: DataResult<<%= classify(name) %>[]>) => loadAllByPostSuccess({ result: result, event: event })),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(failure({ error: err }));
          })
        )
      )
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      pluck('id'),
      switchMap((id) => {
        return this.<%= name %>Das.get(id).pipe(
          map((<%= name %>) => loadSuccess({ <%= name %> })),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(failure({ error: err }));
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(create),
      pluck('<%= name %>'),
      concatMap((<%= name %>) => of(<%= name %>).pipe(withLatestFrom(this.store.select(getLastLazyLoadEvent)))),
      switchMap(([<%= name %>, event]) => {
        return this.<%= name %>Das.post(<%= name %>).pipe(
          map(() => {
            this.biaMessageService.showAddSuccess();
            if (<%= classify(plurialname) %>Effects.useSignalR) {
              return biaSuccessWaitRefreshSignalR();
            } else {
              return loadAllByPost({ event: <LazyLoadEvent>event });
            }
          }),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(failure({ error: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(update),
      pluck('<%= name %>'),
      concatMap((<%= name %>) => of(<%= name %>).pipe(withLatestFrom(this.store.select(getLastLazyLoadEvent)))),
      switchMap(([<%= name %>, event]) => {
        return this.<%= name %>Das.put(<%= name %>, <%= name %>.id).pipe(
          map(() => {
            this.biaMessageService.showUpdateSuccess();
            if (<%= classify(plurialname) %>Effects.useSignalR) {
              return biaSuccessWaitRefreshSignalR();
            } else {
              return loadAllByPost({ event: <LazyLoadEvent>event });
            }
          }),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(failure({ error: err }));
          })
        );
      })
    )
  );

  destroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      pluck('id'),
      concatMap((id: number) => of(id).pipe(withLatestFrom(this.store.select(getLastLazyLoadEvent)))),
      switchMap(([id, event]) => {
        return this.<%= name %>Das.delete(id).pipe(
          map(() => {
            this.biaMessageService.showDeleteSuccess();
            if (<%= classify(plurialname) %>Effects.useSignalR) {
              return biaSuccessWaitRefreshSignalR();
            } else {
              return loadAllByPost({ event: <LazyLoadEvent>event });
            }
          }),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(failure({ error: err }));
          })
        );
      })
    )
  );

  multiDestroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(multiRemove),
      pluck('ids'),
      concatMap((ids: number[]) => of(ids).pipe(withLatestFrom(this.store.select(getLastLazyLoadEvent)))),
      switchMap(([ids, event]) => {
        return this.<%= name %>Das.deletes(ids).pipe(
          map(() => {
            this.biaMessageService.showDeleteSuccess();
            if (<%= classify(plurialname) %>Effects.useSignalR) {
              return biaSuccessWaitRefreshSignalR();
            } else {
              return loadAllByPost({ event: <LazyLoadEvent>event });
            }
          }),
          catchError((err) => {
            this.biaMessageService.showError();
            return of(failure({ error: err }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private <%= name %>Das: <%= classify(name) %>Das,
    private biaMessageService: BiaMessageService,
    private store: Store<AppState>
  ) {}
}
