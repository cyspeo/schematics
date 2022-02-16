import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { <%= classify(plurialname) %>Effects } from './store/<%= plurialname %>-effects';
import { reducers } from './store/<%= name %>.state';
import { <%= classify(name) %>FormComponent } from './components/<%= name %>-form/<%= name %>-form.component';
import { <%= classify(plurialname) %>IndexComponent } from './views/<%= plurialname %>-index/<%= plurialname %>-index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { <%= classify(name) %>NewComponent } from './views/<%= name %>-new/<%= name %>-new.component';
import { <%= classify(name) %>EditComponent } from './views/<%= name %>-edit/<%= name %>-edit.component';
import { Permission } from 'src/app/shared/permission';
import { PermissionGuard } from 'src/app/core/bia-core/guards/permission.guard';
import { <%= classify(name) %>ItemComponent } from './views/<%= name %>-item/<%= name %>-item.component';
import { PopupLayoutComponent } from 'src/app/shared/bia-shared/components/layout/popup-layout/popup-layout.component';
import { FullPageLayoutComponent } from 'src/app/shared/bia-shared/components/layout/fullpage-layout/fullpage-layout.component';
import { <%= classify(name) %>TableComponent } from './components/<%= name %>-table/<%= name %>-table.component';

const ROUTES: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
      permission: Permission.<%= classify(name) %>_List_Access,
      InjectComponent: <%= classify(plurialname) %>IndexComponent
    },
    component: FullPageLayoutComponent,
    canActivate: [PermissionGuard],
    // [Calc] : The children are not used in calc
    children: [
      {
        path: 'create',
        data: {
          breadcrumb: 'bia.add',
          canNavigate: false,
          permission: Permission.<%= classify(name) %>_Create,
          title: '<%= name %>.add',
          InjectComponent: <%= classify(name) %>NewComponent,
        },
        component: PopupLayoutComponent,
        // component: FullPageLayoutComponent,
        canActivate: [PermissionGuard],
      },
      {
        path: ':<%= name %>Id',
        data: {
          breadcrumb: '',
          canNavigate: true,
        },
        component: <%= classify(name) %>ItemComponent,
        canActivate: [PermissionGuard],
        children: [
          {
            path: 'edit',
            data: {
              breadcrumb: 'bia.edit',
              canNavigate: true,
              permission: Permission.<%= classify(name) %>_Update,
              title: '<%= name %>.edit',
              InjectComponent: <%= classify(name) %>EditComponent,
            },
            component: PopupLayoutComponent,
            // component: FullPageLayoutComponent,
            canActivate: [PermissionGuard],
          },
          {
            path: '',
            redirectTo: 'edit'
          },
        ]
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    <%= classify(name) %>ItemComponent,
    // [Calc] : NOT used for calc (4 lines).
    // it is possible to delete unsed commponent files (views/..-new + views/..-edit + components/...-form).
    <%= classify(name) %>FormComponent,
    <%= classify(plurialname) %>IndexComponent,
    <%= classify(name) %>NewComponent,
    <%= classify(name) %>EditComponent,
    // [Calc] : Used only for calc it is possible to delete unsed commponent files (components/...-table)).
    <%= classify(name) %>TableComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('<%= plurialname %>, reducers),
    EffectsModule.forFeature([<%= classify(plurialname) %>Effects]),
    // Domain Modules:
  ]
})
export class <%= classify(name) %>Module {
}

