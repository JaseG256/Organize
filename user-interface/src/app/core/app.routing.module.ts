import { NgModule } from "@angular/core";
import { Route, Routes, RouterModule } from '@angular/router';
import { UserComponent } from "../user/user.component";
import { LoginComponent } from "../login/login.component";
import { UserDetailsComponent } from "../user-details/user-details.component";
import { RegisterComponent } from "../register/register.component";

const indexRoute: Route = {
    path: '', component: UserComponent
};
const fallbackRoute: Route = {
    path: '**', component: LoginComponent
};
const routes: Routes = [
    {
        path: 'api/users',
        children: [
            {
                path: '',
                component: UserComponent
            },
            {
                path: 'users/:username',
                component: UserDetailsComponent
            }
        ]
    },
    {
        path: 'api/auth/signup', component: RegisterComponent
    },
    {
        path: 'api/auth/login', component: LoginComponent
    },
    {
        path: 'users/:username', component: UserDetailsComponent
    },
    
    indexRoute,
    fallbackRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
        // {enableTracing: true}
    )
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
