import { Injectable, Inject } from '@angular/core';
import { LoggerService } from '../shared/logger.service';
import { environment } from '../../../environments/environment';

import { dbConfigProd, dbConfigDev } from './app-config';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {


  constructor(
    private loggerService: LoggerService,
  ) { }

  login(credentials) {
  }

  logout() {
  }

  getAuth() {
  }

}
