import { createReducer, on } from '@ngrx/store';
import { showNavbarEnable, showNavbarDisable } from './navbar.actions';

const initialState = true;

export const showNavbarReducer = createReducer(
  initialState,
  on(showNavbarEnable, (_) => true),
  on(showNavbarDisable, (_) => false)
);
