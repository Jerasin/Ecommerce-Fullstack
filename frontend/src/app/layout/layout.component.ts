import { Component, Inject, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  showNavbarDashBoardDisable,
  showNavbarDashBoardEnable,
} from '../store/navbar-dashboard';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  showNavbarReducer$: Observable<boolean>;
  showNavbarDashBoardReducer$: Observable<boolean>;

  constructor(
    private store: Store<{
      showNavbarDashBoardReducer: boolean;
      showNavbarReducer: boolean;
    }>
  ) {
    this.showNavbarDashBoardReducer$ = this.store.select(
      'showNavbarDashBoardReducer'
    );

    this.showNavbarReducer$ = this.store.select('showNavbarReducer');
  }
}
