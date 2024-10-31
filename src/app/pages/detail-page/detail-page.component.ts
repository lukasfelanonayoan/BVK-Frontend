import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements AfterViewInit {
  id: any;
  dataShow: any = {};
  urlDetail = 'http://localhost:8080/member-api/detail/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngAfterViewInit(): void {
    this.refreshData().then((result: any) => {
      if (result.status == 'Success') {
        this.dataShow = result.data;
        console.log(this.dataShow);
      } else {
        alert(result.message);
        this.dataShow = {};
      }
    });
  }

  async refreshData() {
    return this.httpClient.get(this.urlDetail + this.id).toPromise();
  }
}
