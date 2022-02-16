import { createAction, props } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { <%= classify(name)%> } from '../model/<%=name%>';
import { DataResult } from 'src/app/shared/bia-shared/model/data-result';

export const loadAllByPost = createAction('[<%= classify(plurialname) %>] Load all by post', props<{ event: LazyLoadEvent }>());

export const load = createAction('[<%= classify(plurialname) %>] Load', props<{ id: number }>());

export const create = createAction('[<%= classify(plurialname) %>] Create', props<{ <%= name %>: <%= classify(name) %> }>());

export const update = createAction('[<%= classify(plurialname) %>] Update', props<{ <%= name %>: <%= classify(name) %> }>());

export const remove = createAction('[<%= classify(plurialname) %>] Remove', props<{ id: number }>());

export const multiRemove = createAction('[<%= classify(plurialname) %>] Multi Remove', props<{ ids: number[] }>());

export const loadAllByPostSuccess = createAction(
  '[<%= classify(plurialname) %>] Load all by post success',
  props<{ result: DataResult<<%= classify(name) %>[]>; event: LazyLoadEvent }>()
);

export const loadSuccess = createAction('[<%= classify(plurialname) %>] Load success', props<{ <%= name %>: <%= classify(name) %> }>());

export const failure = createAction('[<%= classify(plurialname) %>] Failure', props<{ error: any }>());






