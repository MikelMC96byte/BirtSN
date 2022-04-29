import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Route } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { PostFullViewComponent } from "./post-full-view/post-full-view.component";
import { PostNewComponent } from "./post-new/post-new.component";
import { PostEditComponent } from "./post-edit/post-edit.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "users/:username", component: ProfileComponent },
    { path: "users/:username/edit", component: ProfileEditComponent },
    { path: "posts/:id", component: PostFullViewComponent },
    { path: "posts/:id/edit", component: PostEditComponent },
    { path: "new-post", component: PostNewComponent },
    { path : "**", redirectTo: "home" }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);