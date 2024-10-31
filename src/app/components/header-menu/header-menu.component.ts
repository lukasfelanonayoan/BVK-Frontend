import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements AfterViewInit{
  loginUser:any ="";

  ngAfterViewInit(): void {
    // this.loginUser = localStorage.getItem("username");
    // if(this.loginUser == null){
    //   alert("Mohon maaf anda wajib login")
    // }
  }

  logout(){
    localStorage.removeItem("username");
  }
}
