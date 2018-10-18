import { Route, RouterModule, Routes } from '@angular/router'
import { MessagesComponent } from '../messages/messages.component';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { RegisterComponent } from '../register/register.component';
import { NgModule } from '@angular/core';

// const indexRoute: Route = {
//     path: '', component: UserComponent
// };
// const fallbackRoute: Route = {
//     path: '**', component: LoginComponent
// };
const routes: Routes = [
    {
        path: 'api/messages',
        component: MessagesComponent
    },
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
    }
    // indexRoute,
    // fallbackRoute
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