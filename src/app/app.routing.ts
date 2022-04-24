import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Route } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { PostComponent } from "./post/post.component";
import { CommentComponent } from "./comment/comment.component";
import { LogoutComponent } from "./logout/logout.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "logout", component: LogoutComponent },
    { path: "register", component: RegisterComponent },
    { path: "users/:username", component: ProfileComponent },
    { path: "users/:username/edit", component: ProfileEditComponent },
    { path: "posts/:id", component: PostComponent },
    { path: "comment/:id", component: CommentComponent },
    { path : "**", redirectTo: "home" }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);