import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
const routes: Routes = [
  {
      path: '',
      redirectTo: 'application',
      pathMatch: 'full'
  },

  // Toolbar
  {
      path: 'toolbar',
      loadChildren: () => import('./components/toolbar/toolbar.module').then(m => m.ToolbarModule)
  },

  // Application
  {
      path: 'application',
      loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule)
  },

  // ExpertCare
  {
      path: 'expertcare-results',
    loadChildren: () => import('./components/expertcare/expertcare-results/expertcare-results.module').then(m => m.ExpertcareResultsModule)
  },

  // Installer
  {
      path: 'installer/:origin',
      loadChildren: () => import('./components/installer/installer.module').then(m => m.InstallerModule)
  },


  // USER
  {
      path: 'user',
      loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' }),
    AngularSplitModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
