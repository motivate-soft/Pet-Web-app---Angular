import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderComponent } from "../header/header.component";
import { PredictCreateComponent } from './predict-create/predict-create.component';
import { PredictHistoryComponent } from './predict-history/predict-history.component';
import { PredictDetailComponent } from './predict-detail/predict-detail.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PredictCreateComponent,
    PredictHistoryComponent,
    PredictDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    InfiniteScrollModule
  ]
})
export class PredictModule {}
