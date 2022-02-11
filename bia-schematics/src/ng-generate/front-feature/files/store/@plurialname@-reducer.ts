import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  loadSuccess,
  loadAllByPostSuccess,
  loadAllByPost,
  load,
  failure
} from './@plurialname@-actions';
import { LazyLoadEvent } from 'primeng/api';
import { @Name@ } from '../model/@name@';

// This adapter will allow is to manipulate @plurialname@ (mostly CRUD operations)
export const @plurialname@Adapter = createEntityAdapter<@Name@>({
  selectId: (@name@: @Name@) => @name@.id,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<@Name@> {
//   ids: string[] | number[];
//   entities: { [id: string]: @Name@ };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface State extends EntityState<@Name@> {
  // additional props here
  totalCount: number;
  current@Name@: @Name@;
  lastLazyLoadEvent: LazyLoadEvent;
  loadingGet: boolean;
  loadingGetAll: boolean;
}

export const INIT_STATE: State = @plurialname@Adapter.getInitialState({
  // additional props default values here
  totalCount: 0,
  current@Name@: <@Name@>{},
  lastLazyLoadEvent: <LazyLoadEvent>{},
  loadingGet: false,
  loadingGetAll: false,
});

export const @name@Reducers = createReducer<State>(
  INIT_STATE,
  on(loadAllByPost, (state, { event }) => {
    return { ...state, loadingGetAll: true };
  }),
  on(load, (state) => {
    return { ...state, loadingGet: true };
  }),
  on(loadAllByPostSuccess, (state, { result, event }) => {
    const stateUpdated = @plurialname@Adapter.setAll(result.data, state);
    stateUpdated.totalCount = result.totalCount;
    stateUpdated.lastLazyLoadEvent = event;
    stateUpdated.loadingGetAll = false;
    return stateUpdated;
  }),
  on(loadSuccess, (state, { @name@ }) => {
    return { ...state, current@Name@: @name@, loadingGet: false };
  }),
  on(failure, (state, { error }) => {
    return { ...state, loadingGetAll: false, loadingGet: false };
  }),
);

export const get@Name@ById = (id: number) => (state: State) => state.entities[id];
