import { inject, Injectable, NgModule } from '@angular/core';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MemberListPageComponent } from './pages/member-list-page/member-list-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  Routes,
  RouterModule,
} from '@angular/router';
import { MemberPageComponent } from './pages/member-page/member-page.component';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('username') != null) {
      return true;
    }
    alert("Mohon maaf, anda wajib login terlebih dahulu");
    this.router.navigate(['']);
    return false;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};

const routes: Routes = [
  { path: '', component: LoginPageComponent},
  {
    path: 'member',
    component: MemberListPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'member/detail/:id',
    component: DetailPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'member/add',
    component: MemberPageComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
