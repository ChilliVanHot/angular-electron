import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToolbarComponent } from './toolbar.component';



const routes: Routes = [
    {
        path: '',
        component: ToolbarComponent
    }
];


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
        NgCircleProgressModule.forRoot()
  ]
})
export class ToolbarModule { }
