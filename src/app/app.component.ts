import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BVK-project';
  userLogin: any = null;

  setLogin() {
    this.userLogin = localStorage.getItem('username');
  }

  checkStatusLogin() {
    this.setLogin();
    return this.userLogin != null;
  }
}
