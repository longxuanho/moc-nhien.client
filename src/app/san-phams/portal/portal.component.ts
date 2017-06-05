import { Component, OnInit } from '@angular/core';

import { SanPhamService } from '../../core/shared/san-pham.service';

@Component({
  selector: 'sk-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  bestSellers;
  newReleases;
  herbs;
  flowers;
  ornamentalPlants;
  fruitTrees;

  constructor(private sanPhamService: SanPhamService) { }
  
  ngOnInit() {
    this.sanPhamService.getSanPhams({ fields: 'ten tags', limit: 50, tags: 'Mới, Bán chạy, Ghim'}) 
      .subscribe(sanphams => {
        console.log(sanphams);
        this.bestSellers = sanphams.filter(sanpham => sanpham.tags.includes('Bán chạy'));
        this.newReleases = sanphams.filter(sanpham => sanpham.tags.includes('Mới'));
        this.herbs = sanphams.filter(sanpham => sanpham.nhom === 'Thảo dược' && sanpham.tags.includes('Ghim'));
        this.flowers = sanphams.filter(sanpham => sanpham.nhom === 'Giống hoa' && sanpham.tags.includes('Ghim'));
        this.ornamentalPlants = sanphams.filter(sanpham => sanpham.nhom === 'Cây cảnh' && sanpham.tags.includes('Ghim'));
        this.fruitTrees = sanphams.filter(sanpham => sanpham.nhom === 'Cây ăn trái' && sanpham.tags.includes('Ghim'));

        console.log(this.bestSellers, this.newReleases, this.herbs, this.flowers, this.ornamentalPlants, this.fruitTrees);
      });
  }

}
