import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { CommentComponent } from './comment/comment.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { SearchComponent } from './search/search.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PostFullViewComponent } from './post-full-view/post-full-view.component';
import { PostNewComponent } from './post-new/post-new.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    ProfileComponent,
    CommentComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavigationBarComponent,
    LogoutComponent,
    SearchComponent,
    ProfilePreviewComponent,
    ProfileEditComponent,
    PostFullViewComponent,
    PostNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
