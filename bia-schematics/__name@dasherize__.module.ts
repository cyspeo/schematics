

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
          title: '<%= name >.add',
          InjectComponent: <%= classify(name) %>NewComponent,
        },
        component: PopupLayoutComponent,
        // component: FullPageLayoutComponent,
        canActivate: [PermissionGuard],
      },
      {
        path: ':<%= name >Id',
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

