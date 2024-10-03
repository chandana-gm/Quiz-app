import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/interface/question.model';
import { QuizServiceService } from 'src/app/service/quiz-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  
  // variable declaration
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  userAnswers: { question: string; selectedAnswer: string }[] = [];
  score: number = 0;
  timer: number = 30;
  interval: any;
  selectedAnswer: string | null = null;
  errorMessage: string | null = null;
  skippedAnswers:number=0
  wrongAnswers:number=0
  correctAnswers:number=0

  constructor(private quizService: QuizServiceService, private router: Router) {}

  ngOnInit(): void {
    this.questions = this.quizService.getQuestions();
    this.startTimer();
  }

  // timer for each questions
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.nextQuestion(true);
      }
    }, 1000);
  }

  // options for Character format
  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
  
  // selected option
  selectAnswer(option: string) {
    this.selectedAnswer = option;
    this.errorMessage = null;
  }

  // next question
  nextQuestion(timerExpired: boolean = false) {
    // if timer is not expired
    if (!timerExpired) {
      if (this.selectedAnswer === null) {
        this.errorMessage = 'Select one answer';
        return;
      }
      // Add answer to the answers array
      this.userAnswers.push({ question: this.questions[this.currentQuestionIndex].questionText, selectedAnswer: this.selectedAnswer });
      // Calculate score
      this.score += this.calculateScoreForQuestion(this.currentQuestionIndex);
    } else {
      // if the timer expired, push a null answer for that question
      this.userAnswers.push({ question: this.questions[this.currentQuestionIndex].questionText, selectedAnswer: '' });
    }
    // Update timer and move to next question
    this.timer = 30;
    clearInterval(this.interval);

    this.currentQuestionIndex++;
    this.selectedAnswer = null;

    // check the question and set timer
    if (this.currentQuestionIndex < this.questions.length) {
      this.startTimer();
    } 
    else {
      // for final question calculate score and navigate to quiz-summary page
      this.quizService.score = this.score;
      this.router.navigate(['quiz-summary']);
    }
  }

  // calculate score
  calculateScoreForQuestion(questionIndex: number): number {
    if (this.userAnswers[questionIndex]?.selectedAnswer === this.questions[questionIndex]?.correctAnswer) {
      return 1;
    }
    return 0;
  }

  // in case of skipping the question
  moveToNextQuestion() {
    this.timer = 30;
    clearInterval(this.interval);
    this.currentQuestionIndex++;
    this.selectedAnswer = null;
    this.errorMessage = null;

    if (this.currentQuestionIndex < this.questions.length) {
      this.startTimer();
    } else {
      this.quizService.score = this.score;
      this.router.navigate(['quiz-summary']);
    }
  }
}
