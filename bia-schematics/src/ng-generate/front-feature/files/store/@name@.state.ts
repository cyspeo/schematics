import * as from@Plurialname@ from './@plurialname@-reducer';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export interface @Plurialname@State {
  @plurialname@: from@Plurialname@.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: @Plurialname@State | undefined, action: Action) {
  return combineReducers({
    @plurialname@: from@Plurialname@.@name@Reducers
  })(state, action);
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const get@Plurialname@State = createFeatureSelector<@Plurialname@State>('@plurialname@');

export const get@Plurialname@EntitiesState = createSelector(
  get@Plurialname@State,
  (state) => state.@plurialname@
);

export const get@Plurialname@TotalCount = createSelector(
  get@Plurialname@EntitiesState,
  (state) => state.totalCount
);

export const getCurrent@Name@ = createSelector(
  get@Plurialname@EntitiesState,
  (state) => state.current@Name@
);

export const getLastLazyLoadEvent = createSelector(
  get@Plurialname@EntitiesState,
  (state) => state.lastLazyLoadEvent
);

export const get@Name@LoadingGet = createSelector(
  get@Plurialname@EntitiesState,
  (state) => state.loadingGet
);

export const get@Name@LoadingGetAll = createSelector(
  get@Plurialname@EntitiesState,
  (state) => state.loadingGetAll
);

export const { selectAll: getAll@Plurialname@ } = from@Plurialname@.@plurialname@Adapter.getSelectors(get@Plurialname@EntitiesState);

export const get@Name@ById = (id: number) =>
  createSelector(
    get@Plurialname@EntitiesState,
    from@Plurialname@.get@Name@ById(id)
  );
