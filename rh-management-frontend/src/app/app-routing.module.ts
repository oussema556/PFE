import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthPageComponent} from "./featureModules/auth/containers/auth-page/auth-page.component";
import {
  DeveloperDashboardComponent
} from "./featureModules/developer/containers/developer-dashboard/developer-dashboard.component";
import {
  ManagerDashboardComponent
} from "./featureModules/manager/containers/manager-dashboard/manager-dashboard.component";
import {AdminDashboardComponent} from "./featureModules/admin/containers/admin-dashboard/admin-dashboard.component";
import {TeamTableComponent} from "./featureModules/manager/components/team-table/team-table.component";
import {ProfileComponent} from "./shared/components/profile/profile.component";
import {EmployeesTableComponent} from "./featureModules/admin/components/employees-table/employees-table.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {NoPerissionComponent} from "./shared/components/no-perission/no-perission.component";
import {AdminGuard} from "./core/guards/admin.guard";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {ManagerGuard} from "./core/guards/manager.guard";
import {DeveloperGuard} from "./core/guards/developer.guard";
import {RequestsTableComponent} from "./featureModules/admin/components/requests-table/requests-table.component";
import {RequestProfileComponent} from "./shared/components/request-profile/request-profile.component";
import {
  EditEmployeeFormComponent
} from "./featureModules/admin/components/edit-employee-form/edit-employee-form.component";
import {EditAccountComponent} from "./shared/components/edit-account/edit-account.component";

const routes: Routes = [
  {
    path:'auth',
    component:AuthPageComponent
  },
  {
    path:'employee',
    children:[
      {
        path: 'editProfile',
        component: EditAccountComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'developer',
        component:DeveloperDashboardComponent,
        canActivate:[DeveloperGuard]
      },
      {
        path:'manager',
        component:ManagerDashboardComponent,
        canActivate:[ManagerGuard],
        children:[
          {
            path:'team',
            component: TeamTableComponent
          },
          {
            path:'teamRequests',
            component: TeamTableComponent
          },
          {
            path: 'profile/:id',
            component: ProfileComponent
          }
        ]
      },
      {
        path:'admin',
        component:AdminDashboardComponent,
        canActivate:[AdminGuard],
        children: [
          {
            path: 'employees',
            component: EmployeesTableComponent,
          },
          {
            path: 'viewProfile/:id',
            component: ProfileComponent
          },
          {
            path: 'editEmployeeProfile/:id',
            component: EditEmployeeFormComponent
          },
          {
            path: 'request/:id',
            component: RequestProfileComponent
          },

          {
            path: 'requests',
            component: RequestsTableComponent
          },


        ]
      }
    ]
  },
  {
    path:'no-permission',
    component:NoPerissionComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
