import { createAction, props } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { @Name@ } from '../model/@name@';
import { DataResult } from 'src/app/shared/bia-shared/model/data-result';

export const loadAllByPost = createAction('[@Plurialname@] Load all by post', props<{ event: LazyLoadEvent }>());

export const load = createAction('[@Plurialname@] Load', props<{ id: number }>());

export const create = createAction('[@Plurialname@] Create', props<{ @name@: @Name@ }>());

export const update = createAction('[@Plurialname@] Update', props<{ @name@: @Name@ }>());

export const remove = createAction('[@Plurialname@] Remove', props<{ id: number }>());

export const multiRemove = createAction('[@Plurialname@] Multi Remove', props<{ ids: number[] }>());

export const loadAllByPostSuccess = createAction(
  '[@Plurialname@] Load all by post success',
  props<{ result: DataResult<@Name@[]>; event: LazyLoadEvent }>()
);

export const loadSuccess = createAction('[@Plurialname@] Load success', props<{ @name@: @Name@ }>());

export const failure = createAction('[@Plurialname@] Failure', props<{ error: any }>());






