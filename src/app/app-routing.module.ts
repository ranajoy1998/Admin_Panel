import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewcategoryComponent } from './user-profile/viewcategory/viewcategory.component';
import { AddcategoryComponent } from './user-profile/addcategory/addcategory.component';
import { ViewbookingsComponent } from './user-profile/viewbookings/viewbookings.component';
import { ViewusersComponent } from './user-profile/viewusers/viewusers.component';
import { ViewfoodComponent } from './user-profile/viewfood/viewfood.component';
import { AddfoodComponent } from './user-profile/addfood/addfood.component';
import { HomeComponent } from './user-profile/home/home.component';

const routes: Routes = [
  {
    path: 'userprofile', component: UserProfileComponent,
    children: [{path: 'viewcategory', component: ViewcategoryComponent}]
  },
  {
    path: 'userprofile', component: UserProfileComponent,
    children: [{path: 'addcategory', component: AddcategoryComponent}]
  },
  {
    path: 'userprofile', component: UserProfileComponent,
    children: [{path: 'viewbookings', component: ViewbookingsComponent}]
  },
  {
    path: 'userprofile', component: UserProfileComponent,
    children: [{path: 'viewusers', component: ViewusersComponent}]
  },
  {
    path: 'userprofile', component: UserProfileComponent,
    children: [{path: 'viewfood', component: ViewfoodComponent}]
  },
  {
    path: 'userprofile', component: UserProfileComponent,
    children: [{path: 'addfood', component: AddfoodComponent}]
  },
  {
    path: 'userprofile', component: UserProfileComponent,
    children: [{path: 'home', component: HomeComponent}]
  },
  { path: 'userprofile', pathMatch: 'full', redirectTo: '/userprofile/home' },
  { path: 'userprofile/', pathMatch: 'full', redirectTo: '/userprofile/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
