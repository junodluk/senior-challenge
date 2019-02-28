import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'custom-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  items: MenuItem[] = [
    {
      label: 'Novo Item',
      icon: 'fas fa-plus',
      routerLink: ['/items/new']
    },
    {
      label: 'Lista de Itens',
      icon: 'fas fa-list',
      routerLink: ['/items/list']
    },
  ];

  private subscribers: Subscription[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router
  ) {

  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    for (const subscriber of this.subscribers) {
      subscriber.unsubscribe();
    }
  }

}
