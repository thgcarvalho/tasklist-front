import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from "./task/task.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: TaskComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
