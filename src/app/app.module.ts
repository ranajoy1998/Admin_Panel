// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AduserService } from './shared/aduser.service';

//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AddcategoryComponent } from './user-profile/addcategory/addcategory.component';
import { ViewcategoryComponent } from './user-profile/viewcategory/viewcategory.component';
import { AddfoodComponent } from './user-profile/addfood/addfood.component';
import { ViewfoodComponent } from './user-profile/viewfood/viewfood.component';
import { ViewusersComponent } from './user-profile/viewusers/viewusers.component';
import { ViewbookingsComponent } from './user-profile/viewbookings/viewbookings.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './user-profile/home/home.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    AddcategoryComponent,
    ViewcategoryComponent,
    AddfoodComponent,
    ViewfoodComponent,
    ViewusersComponent,
    ViewbookingsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, DatePipe, AduserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
