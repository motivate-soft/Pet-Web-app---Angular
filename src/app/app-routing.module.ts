import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { PredictCreateComponent } from "./predict/predict-create/predict-create.component";
import { PredictHistoryComponent } from "./predict/predict-history/predict-history.component";
import { PredictDetailComponent } from "./predict/predict-detail/predict-detail.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [  
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "predict", component: PredictCreateComponent, canActivate: [AuthGuard]},
  { path: "history", component: PredictHistoryComponent, canActivate: [AuthGuard]},
  { path: "detail/:id", component: PredictDetailComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  { path: "**", redirectTo: '/predict' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
