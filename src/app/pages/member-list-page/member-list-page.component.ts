import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Params } from '@angular/router';

@Component({
  selector: 'app-member-list-page',
  templateUrl: './member-list-page.component.html',
  styleUrls: ['./member-list-page.component.scss'],
})
export class MemberListPageComponent implements AfterViewInit {
  urlList = 'http://localhost:8080/member-api/list';
  queryParams: Params = {};
  listData: any[] = [];
  listShow: any[] = [];
  maxPage: any = 0;
  maxShow: any = 10;
  page: any = 0;

  inputType: FormControl = new FormControl('name');
  inputSearch: FormControl = new FormControl('');

  constructor(private httpClient: HttpClient) {
    this.inputType.valueChanges.subscribe(() => {
      this.searchEngine();
    });
    this.inputSearch.valueChanges.subscribe(() => {
      this.searchEngine();
    });
  }

  ngAfterViewInit(): void {
    this.refreshData().then((result: any) => {
      if (result.status == 'Success') {
        this.listData = result.data;
      } else {
        alert(result.message);
        this.listData = [];
      }

      this.maxPage = Math.ceil(this.listData.length / this.maxShow);
      this.changePage(0);
    });
  }

  async refreshData() {
    return this.httpClient
      .get(this.urlList, { params: this.queryParams })
      .toPromise();
  }

  changePage(pageNow: any) {
    this.page = pageNow;
    let start = this.page * this.maxShow;
    let end = start + this.maxShow;

    if (end > this.listData.length) {
      end = this.listData.length;
    }

    this.listShow = [];
    for (let i = start; i < end; i++) {
      this.listShow.push(this.listData.at(i));
    }
  }

  searchEngine() {
    this.queryParams = {};
    if (String(this.inputSearch.value).length > 2) {
      let type = this.inputType.value;
      let textInput = this.inputSearch.value;
      this.queryParams = new HttpParams().set(type, textInput);
      this.refreshData().then((result: any) => {
        if (result.status == 'Success') {
          this.listData = result.data;
        } else {
          alert(result.message);
          this.listData = [];
        }

        this.maxPage = Math.ceil(this.listData.length / this.maxShow);
        this.changePage(0);
      });
    } else if (String(this.inputSearch.value).length == 0) {
      this.refreshData().then((result: any) => {
        if (result.status == 'Success') {
          this.listData = result.data;
        } else {
          alert(result.message);
          this.listData = [];
        }

        this.maxPage = Math.ceil(this.listData.length / this.maxShow);
        this.changePage(0);
      });
    }
  }
}
