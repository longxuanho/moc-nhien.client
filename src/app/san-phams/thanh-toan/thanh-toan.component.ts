import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DonHangService, DonHangModel, ItemCartModel } from '../../core/shared/don-hang.service';
import { LoggerService } from '../../core/shared/logger.service';

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
  isThongTinGiaoHangKhacThongTinThanhToan: FormControl;
  hoTenNguoiNhan: FormControl;
  dienThoaiNguoiNhan: FormControl;
  locations: any;
  tinhThanhsSelect: string[] = [];
  quanHuyensSelect: { [key: string]: string[] } = {};

  isThanhToanChuyenKhoan: boolean = false;
  isAllowThanhToanTienMat: boolean = true;

  get isItemsCountValid(): boolean {
    if (!this.donHang.tinhThanh) return false;

    let minItemsCount = (this.donHang.tinhThanh === 'Hồ Chí Minh') ? 21 : 42;

    return this.donHangService.getDonHangLocal().itemsCount > minItemsCount;
  }

  constructor(private donHangService: DonHangService, private fb: FormBuilder, private loggerService: LoggerService, private router: Router) {
    this.buildForm();
  }

  buildForm() {
    this.hoTen = this.fb.control('', [Validators.required]);
    this.dienThoai = this.fb.control('', [Validators.required]);
    this.email = this.fb.control('');
    this.isThongTinGiaoHangKhacThongTinThanhToan = this.fb.control(false, [Validators.required]);
    this.hoTenNguoiNhan = this.fb.control('', [Validators.required]);
    this.dienThoaiNguoiNhan = this.fb.control('', [Validators.required]);
    this.diaChi = this.fb.control('', [Validators.required]);
    this.tinhThanh = this.fb.control('', [Validators.required]);
    this.quanHuyen = this.fb.control('', [Validators.required]);
    this.cachThanhToan = this.fb.control('Tiền mặt', [Validators.required]);
    this.ghiChu = this.fb.control('');

    this.donHangForm = this.fb.group({
      hoTen: this.hoTen,
      dienThoai: this.dienThoai,
      email: this.email,
      isThongTinGiaoHangKhacThongTinThanhToan: this.isThongTinGiaoHangKhacThongTinThanhToan,
      hoTenNguoiNhan: this.hoTenNguoiNhan,
      dienThoaiNguoiNhan: this.dienThoaiNguoiNhan,
      diaChi: this.diaChi,
      tinhThanh: this.tinhThanh,
      quanHuyen: this.quanHuyen,
      cachThanhToan: this.cachThanhToan,
      ghiChu: this.ghiChu
    });
  }

  resetForm() {
    this.donHangForm.reset(this.donHangService.initDonHangLocal());
  }

  initForm() {
    this.donHangForm.reset(this.donHangService.getDonHangLocal());
  }

  onResolveDonHang() {
    if (!this.donHang) return;

    this.donHangService.resolveDonHangLocal(this.donHang);
    this.donHangService.saveDonHangLocal(this.donHang);
  }

  onResolveLocationSelect(tinhThanhSelected: string, locations) {
    let quanHuyenSelect = {};

    locations.forEach(location => {
      quanHuyenSelect[location.tinhThanh] = quanHuyenSelect[location.tinhThanh] || [];
      quanHuyenSelect[location.tinhThanh].push(location.quanHuyen);
    });
    let tinhThanhSelect = Object.keys(quanHuyenSelect);

    this.tinhThanhsSelect = tinhThanhSelect;
    this.quanHuyensSelect = quanHuyenSelect;

  }

  subscribeFormChanges() {
    this.donHangForm.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
        this.donHang = Object.assign(this.donHangService.getDonHangLocal(), value);

        if (!this.donHang.isThongTinGiaoHangKhacThongTinThanhToan) {
          this.donHang.hoTenNguoiNhan = this.donHang.hoTen;
          this.donHang.dienThoaiNguoiNhan = this.donHang.dienThoai;
          this.hoTenNguoiNhan.setValue(this.donHang.hoTen);
          this.dienThoaiNguoiNhan.setValue(this.donHang.dienThoai);
        }

        if (this.tinhThanh.value && this.tinhThanh.value !== 'Hồ Chí Minh') this.cachThanhToan.setValue('Chuyển khoản');
        this.isAllowThanhToanTienMat = (!this.tinhThanh.value || this.tinhThanh.value === 'Hồ Chí Minh');
        this.isThanhToanChuyenKhoan = (this.cachThanhToan.value === "Chuyển khoản");

        this.donHangService.resolveDonHangLocal(this.donHang);
        this.donHangService.saveDonHangLocal(this.donHang);
      });

    // Khi người dùng chọn tỉnh thành, chỉ cho phép chọn chuyển khoản nếu tỉnh thành khác 'Hồ Chí Minh', reset và xử lý các menu tinhThanhs và quanHuyens
    this.tinhThanh.valueChanges
      .subscribe(value => {
        this.quanHuyen.setValue('');
        this.donHang.phiVanChuyen = 0;

        this.donHangService.resolveDonHangLocal(this.donHang);
        this.donHangService.saveDonHangLocal(this.donHang);
      });
    this.quanHuyen.valueChanges
      .subscribe(quanHuyen => {
        if (!quanHuyen || !this.locations) return;

        let tinhThanh = this.tinhThanh.value;

        // Tính phí vận chuyển.
        let foundLocation = this.locations.find(location => location.tinhThanh === tinhThanh && location.quanHuyen === quanHuyen);
        this.donHang.phiVanChuyen = (foundLocation && foundLocation.phiVanChuyen) ? foundLocation.phiVanChuyen : 0;

        this.donHangService.resolveDonHangLocal(this.donHang);
        this.donHangService.saveDonHangLocal(this.donHang);
      })
  }

  createNewDonHang() {
    let preparedDonHang = Object.assign(this.donHangService.getDonHangLocal(), this.donHangForm.value);
    this.donHangService.createNewDonHang(preparedDonHang)
      .subscribe(success => {
        this.loggerService.success('Đơn hàng của bạn đã được tạo mới thành công và đang chờ được chúng tôi xử lý.', 'Tạo mới thành công');

        this.donHangService.resetDonHangLocal();
        this.router.navigate([`/don-hang/${success['_id']}`]);

      }, error => this.loggerService.error(`Có lỗi khi khởi tạo đơn hàng này. ${error.message}`, 'Tạo đơn hàng thất bại'))
  }

  ngOnInit() {
    this.donHang = this.donHangService.getDonHangLocal();

    this.initForm();
    this.isThanhToanChuyenKhoan = (this.cachThanhToan.value === "Chuyển khoản");
    this.subscribeFormChanges();

    this.onResolveDonHang();

    this.donHangService.getLocations()
      .subscribe(locations => {
        this.locations = locations;
        this.onResolveLocationSelect(null, this.locations);

        // Fix bug không hiện tên tỉnh thành và quân huyện
        setTimeout(() => {
          this.tinhThanh.setValue(this.donHang.tinhThanh);
          this.quanHuyen.setValue(this.donHang.quanHuyen);
        }, 200);

      });
  }

  ngAfterViewInit() {

  }
}
