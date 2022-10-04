import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

import { OrderTrackerComponent } from './order-tracker.component';
import { TrackerFormComponent } from './components/tracker-form/tracker-form.component';

const routes: Routes = [
  {
    path: '',
    component: OrderTrackerComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
  ],
  declarations: [OrderTrackerComponent, TrackerFormComponent],
})
export class OrderTrackerModule {}
