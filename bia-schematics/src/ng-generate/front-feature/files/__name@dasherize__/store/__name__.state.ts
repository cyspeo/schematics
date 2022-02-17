import * as from<%=classify(plurialname)%> from './<%=plurialname%>-reducer';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export interface <%= classify(plurialname) %>State {
  <%= plurialname %>: from<%= classify(plurialname) %>.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: <%= classify(plurialname) %>State | undefined, action: Action) {
  return combineReducers({
    <%=plurialname%>: from<%= classify(plurialname) %>.<%=name%>Reducers
  })(state, action);
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const get<%= classify(plurialname) %>State = createFeatureSelector<<%= classify(plurialname) %>State>('<%=plurialname%>');

export const get<%= classify(plurialname) %>EntitiesState = createSelector(
  get<%= classify(plurialname) %>State,
  (state) => state.<%=plurialname%>
);

export const get<%= classify(plurialname) %>TotalCount = createSelector(
  get<%= classify(plurialname) %>EntitiesState,
  (state) => state.totalCount
);

export const getCurrent<%= classify(name) %> = createSelector(
  get<%= classify(plurialname) %>EntitiesState,
  (state) => state.current<%= classify(name) %>
);

export const getLastLazyLoadEvent = createSelector(
  get<%= classify(plurialname) %>EntitiesState,
  (state) => state.lastLazyLoadEvent
);

export const get<%= classify(name) %>LoadingGet = createSelector(
  get<%= classify(name) %>EntitiesState,
  (state) => state.loadingGet
);

export const get<%= classify(name) %>LoadingGetAll = createSelector(
  get<%= classify(name) %>EntitiesState,
  (state) => state.loadingGetAll
);

export const { selectAll: getAll<%= classify(plurialname) %> } = from<%= classify(plurialname) %>.<%= plurialname %>Adapter.getSelectors(get<%= classify(plurialname) %>EntitiesState);

export const get<%= classify(name) %>ById = (id: number) =>
  createSelector(
    get<%= classify(plurialname) %>EntitiesState,
    from<%= classify(plurialname) %>.get<%= classify(name) %>ById(id)
  );
