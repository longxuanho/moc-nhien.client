import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  success(message: string, title?: string) {
    title = title ? title : 'Thành công';
    console.log(title, message);
  }

  info(message: string, title?: string) {
    title = title ? title : 'Thông tin';
    console.log(title, message);
  }

  error(message: string, title?: string) {
    title = title ? title : 'Lỗi';
    console.log(title, message);
  }

  warning(message: string, title?: string) {
    title = title ? title : 'Cảnh báo';
    console.log(title, message);
  }

}