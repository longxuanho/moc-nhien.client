import { Injectable, Inject } from '@angular/core';

import { ToastrService } from 'toastr-ng2';

@Injectable()
export class LoggerService {

  constructor(private toastrService: ToastrService) { }

  success(message: string, title?: string) {
    title = title ? title : 'Thành công';
    this.toastrService.success(message, title);
  }

  info(message: string, title?: string) {
    title = title ? title : 'Thông tin';
    this.toastrService.info(message, title);
  }

  error(message: string, title?: string) {
    title = title ? title : 'Lỗi';
    this.toastrService.error(message, title);
  }

  warning(message: string, title?: string) {
    title = title ? title : 'Cảnh báo';
    this.toastrService.warning(message, title);
  }

}