import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sk-san-pham-card',
  templateUrl: './san-pham-card.component.html',
  styleUrls: ['./san-pham-card.component.scss']
})
export class SanPhamCardComponent implements OnInit {

  @Input() product;
  
  constructor(private router: Router) { }

  goToProductDetail(id) {
    this.router.navigate(['/san-pham', 1]);
  }

  ngOnInit() {
  }

}
