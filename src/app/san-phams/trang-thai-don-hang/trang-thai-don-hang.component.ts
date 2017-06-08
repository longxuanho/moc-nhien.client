import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sk-trang-thai-don-hang',
  templateUrl: './trang-thai-don-hang.component.html',
  styleUrls: ['./trang-thai-don-hang.component.scss']
})
export class TrangThaiDonHangComponent implements OnInit {

  @Input() trangThai: string;

  constructor() { }

  ngOnInit() {
  }

}
