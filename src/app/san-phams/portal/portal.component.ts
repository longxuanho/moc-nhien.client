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
    this.sanPhamService.getSanPhams({ fields: 'nhom ten ma tags cover soLuong trichDan giaBan dvt dacTinh', limit: 50, tags: 'New Releases, Best Seller, Pinned'})
      .map(res => res.json()) 
      .subscribe(sanphams => {
        this.bestSellers = sanphams.filter(sanpham => sanpham.tags.includes('Best Seller'));
        this.newReleases = sanphams.filter(sanpham => sanpham.tags.includes('New Releases'));
        this.herbs = sanphams.filter(sanpham => sanpham.nhom === 'Thảo dược' && sanpham.tags.includes('Pinned'));
        this.flowers = sanphams.filter(sanpham => sanpham.nhom === 'Giống hoa' && sanpham.tags.includes('Pinned'));
        this.ornamentalPlants = sanphams.filter(sanpham => sanpham.nhom === 'Cây cảnh' && sanpham.tags.includes('Pinned'));
        this.fruitTrees = sanphams.filter(sanpham => sanpham.nhom === 'Cây ăn trái' && sanpham.tags.includes('Pinned'));
      });
  }

}
