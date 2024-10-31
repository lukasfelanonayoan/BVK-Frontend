import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MemberPageComponent } from './pages/member-page/member-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { MemberListPageComponent } from './pages/member-list-page/member-list-page.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { MemberFormComponent } from './forms/member-form/member-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MemberPageComponent,
    DetailPageComponent,
    MemberListPageComponent,
    HeaderMenuComponent,
    MemberFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
