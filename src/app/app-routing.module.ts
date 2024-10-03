import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component';
import { EndQuizComponent } from './components/end-quiz/end-quiz.component';

const routes: Routes = [
  {path:'', component:StartQuizComponent},
  {path:'quiz', component:QuizComponent},
  {path:'quiz-summary', component:EndQuizComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
