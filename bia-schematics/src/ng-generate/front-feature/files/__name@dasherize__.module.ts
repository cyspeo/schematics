import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { @Plurialname@Effects } from './store/@plurialname@-effects';
import { reducers } from './store/@name@.state';
import { @Name@FormComponent } from './components/@name@-form/@name@-form.component';
import { @Plurialname@IndexComponent } from './views/@plurialname@-index/@plurialname@-index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { @Name@NewComponent } from './views/@name@-new/@name@-new.component';
import { @Name@EditComponent } from './views/@name@-edit/@name@-edit.component';
import { Permission } from 'src/app/shared/permission';
import { PermissionGuard } from 'src/app/core/bia-core/guards/permission.guard';
import { @Name@ItemComponent } from './views/@name@-item/@name@-item.component';
import { PopupLayoutComponent } from 'src/app/shared/bia-shared/components/layout/popup-layout/popup-layout.component';
import { FullPageLayoutComponent } from 'src/app/shared/bia-shared/components/layout/fullpage-layout/fullpage-layout.component';
import { AirportOptionModule } from 'src/app/domains/airport-option/airport-option.module';
import { @Name@TypeOptionModule } from 'src/app/domains/@name@-type-option/@name@-type-option.module';
import { @Name@TableComponent } from './components/@name@-table/@name@-table.component';

const ROUTES: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
      permission: Permission.@Name@_List_Access,
      InjectComponent: @Plurialname@IndexComponent
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
          permission: Permission.@Name@_Create,
          title: '@name@.add',
          InjectComponent: @Name@NewComponent,
        },
        component: PopupLayoutComponent,
        // component: FullPageLayoutComponent,
        canActivate: [PermissionGuard],
      },
      {
        path: ':@name@Id',
        data: {
          breadcrumb: '',
          canNavigate: true,
        },
        component: @Name@ItemComponent,
        canActivate: [PermissionGuard],
        children: [
          {
            path: 'edit',
            data: {
              breadcrumb: 'bia.edit',
              canNavigate: true,
              permission: Permission.@Name@_Update,
              title: '@name@.edit',
              InjectComponent: @Name@EditComponent,
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
    @Name@ItemComponent,
    // [Calc] : NOT used for calc (4 lines).
    // it is possible to delete unsed commponent files (views/..-new + views/..-edit + components/...-form).
    @Name@FormComponent,
    @Plurialname@IndexComponent,
    @Name@NewComponent,
    @Name@EditComponent,
    // [Calc] : Used only for calc it is possible to delete unsed commponent files (components/...-table)).
    @Name@TableComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('@plurialname@', reducers),
    EffectsModule.forFeature([@Plurialname@Effects]),
    // Domain Modules:
    AirportOptionModule,
    @Name@TypeOptionModule,
  ]
})
export class @Name@Module {
}

