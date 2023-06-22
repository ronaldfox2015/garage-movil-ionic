import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./page/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'reservation',
    loadChildren: () => import('./page/reservation/reservation.module').then( m => m.ReservationPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./page/my-account/my-account.module').then( m => m.MyAccountPageModule)
  },
  {
    path: 'ad-detail',
    loadChildren: () => import('./page/ad-detail/ad-detail.module').then( m => m.AdDetailPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./page/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./page/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'publish',
    loadChildren: () => import('./page/publish/publish.module').then( m => m.PublishPageModule)
  },
  {
    path: 'list-advertisement',
    loadChildren: () => import('./page/list-advertisement/list-advertisement.module').then( m => m.ListAdvertisementPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
