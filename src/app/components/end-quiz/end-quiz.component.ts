import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/interface/question.model';
import { QuizServiceService } from 'src/app/service/quiz-service.service';

@Component({
  selector: 'app-end-quiz',
  templateUrl: './end-quiz.component.html',
  styleUrls: ['./end-quiz.component.css']
})
export class EndQuizComponent {
score: number = 0;
 questions: Question[] = [];
user:any
  constructor(private quizService:QuizServiceService , private router:Router){}

  ngOnInit(): void {
    window.scroll(0,0)
      this.score = this.quizService.score;
    console.log(this.score);
    
    const participant = localStorage.getItem('participant');
    if (participant) {
      this.user = participant
    }
    this.questions = this.quizService.getQuestions();
  }
  retryQuiz(){
    this.quizService.retryQuiz();
this.router.navigate(['quiz'])
  }
}
