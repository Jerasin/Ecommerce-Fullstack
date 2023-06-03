import { Component, Inject, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  showNavbar: boolean;
  constructor(@Inject('LayoutService') private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.getShowNavbar().subscribe((e) => (this.showNavbar = e));
  }
}
