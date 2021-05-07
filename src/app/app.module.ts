import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HomeComponent } from './home/home.component';
import { PollTileComponent } from './shared/poll-tile/poll-tile.component';
import { ChoiceTileComponent } from './shared/choice-tile/choice-tile.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { TokenInterceptor } from './token-interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProfileComponent } from './auth/profile/profile.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PollTileComponent,
    ChoiceTileComponent,
    HeaderComponent,
    ProfileComponent,
    CreatePollComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
