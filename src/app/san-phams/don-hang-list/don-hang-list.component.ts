import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-don-hang-list',
  templateUrl: './don-hang-list.component.html',
  styleUrls: ['./don-hang-list.component.scss']
})
export class DonHangListComponent implements OnInit {

  searchTextChanged: Subject<string> = new Subject<string>();
  searchText: string = '';

  constructor() { }

  onSearchInput(event) {
    this.searchTextChanged.next(event);
  }

  ngOnInit() {
    this.searchTextChanged
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(searchText => {
        console.log(searchText);
      });
  }

}
