import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sk-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  @Input() mode: string = 'search-textbox';
  @Input() menu = {
    herbNhapNgoaiMenu: [],
    herbTrongNuocMenu: [],
    fruitTreeNhietDoiMenu:[],
    fruitTreeOnDoiMenu: [],
    flowerMenu: [],
    ornamentalPlantMenu: []
  }
  
  constructor() { }

  ngOnInit() {
  }

}
