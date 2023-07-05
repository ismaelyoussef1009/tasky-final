import { NgModule, SimpleChange } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MainComponent } from './main/main.component';
const routes: Routes = [
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path:'create-account',
    component:CreateAccountComponent,
  },
  {
    path:'sign-in',
    component: SignInComponent,
  },
  {
    path:'main',
    component: MainComponent,
  },
  {
    path: '',
    redirectTo: '/home-page', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
