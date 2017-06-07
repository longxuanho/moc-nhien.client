import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { DonHangService, DonHangModel, ItemCartModel } from '../../core/shared/don-hang.service';

@Component({
  selector: 'sk-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.scss']
})
export class ThanhToanComponent implements OnInit, AfterViewInit {

  donHang: DonHangModel;

  totalPrice: number = 0;

  donHangForm: FormGroup;
  hoTen: FormControl;
  dienThoai: FormControl;
  email: FormControl;
  diaChi: FormControl;
  tinhThanh: FormControl;
  quanHuyen: FormControl;
  cachThanhToan: FormControl;
  ghiChu: FormControl;
  
  constructor(private donHangService: DonHangService, private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm() {
    this.hoTen = this.fb.control('', [Validators.required]);
    this.dienThoai = this.fb.control('', [Validators.required]);
    this.email = this.fb.control('', [Validators.required]);
    this.diaChi = this.fb.control('', [Validators.required]);
    this.tinhThanh = this.fb.control('', [Validators.required]);
    this.quanHuyen = this.fb.control('', [Validators.required]);
    this.cachThanhToan = this.fb.control('Tiền mặt', [Validators.required]);
    this.ghiChu = this.fb.control('');

    this.donHangForm = this.fb.group({
      khachHang: this.fb.group({
        hoTen: this.hoTen,
        dienThoai: this.dienThoai,
        email: this.email,
        diaChi: this.diaChi,
        tinhThanh: this.tinhThanh,
        quanHuyen: this.quanHuyen
      }),
      cachThanhToan: this.cachThanhToan,
      ghiChu: this.ghiChu
    });
  }

  resetForm() {
    this.donHangForm.reset(this.donHangService.initDonHang());
  }

  onResolveCart() {
    if (!this.donHang) return;

    this.totalPrice = 0;
    this.donHang.sanPhams.forEach(item => {
      item.thanhTien = item.soLuong * item.donGia;
      this.totalPrice += item.thanhTien;
    });
    this.donHangService.saveDonHang(this.donHang);
  }

  subscribeFormChanges() {
    this.donHangForm.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        Object.assign(this.donHang, value);
        
        this.donHangService.saveDonHang(this.donHang);        
      });

  }

  ngOnInit() {
    this.donHang = this.donHangService.getDonHang();
    this.onResolveCart();
  }

  ngAfterViewInit() {
    this.subscribeFormChanges();
  }
}
