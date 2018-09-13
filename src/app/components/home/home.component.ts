import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentPage: Pages;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit() {
    this.document.body.id = "page-top";
    this.currentPage = 5;
  }


}

export enum Pages {
  pageClientes = 1,
  pageArticulos = 2,
  pageRubros = 3,
  pagePedidos = 4,
  pageHome = 5
}
