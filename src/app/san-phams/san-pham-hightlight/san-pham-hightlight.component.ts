import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sk-san-pham-hightlight',
  templateUrl: './san-pham-hightlight.component.html',
  styleUrls: ['./san-pham-hightlight.component.scss']
})
export class SanPhamHightlightComponent implements OnInit {

  @Input() products: [any];
  @Input() category: string;

  constructor() { }

  ngOnInit() {
  }

}
