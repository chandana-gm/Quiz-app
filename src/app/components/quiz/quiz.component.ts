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
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  userAnswers: { question: string; selectedAnswer: string }[] = [];
  score: number = 0;
  timer: number = 30;
  interval: any;
  selectedAnswer: string | null = null; // Store the selected answer for the current question
  errorMessage: string | null = null; // New property for error message
  skippedAnswers:number=0
  wrongAnswers:number=0
  correctAnswers:number=0
  constructor(private quizService: QuizServiceService, private router: Router) {}

  ngOnInit(): void {
    window.scroll()
    this.questions = this.quizService.getQuestions();
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.nextQuestion(true); // Pass true to indicate timer expiration
      }
    }, 1000);
  }
  getLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 is the ASCII code for 'A'
  }
  
  stopTimer() {
    clearInterval(this.interval);
  }

  selectAnswer(option: string) {
    this.selectedAnswer = option; // Set selected answer for current question
    this.errorMessage = null; // Reset error message when an answer is selected
  }

  nextQuestion(timerExpired: boolean = false) {
    // // If the timer has expired, don't check for selected answer
    // if (timerExpired || this.selectedAnswer === null) {
    //   // If the timer expired or no answer was selected, count as skipped
    //   this.skippedAnswers++;
    //   this.userAnswers.push({ question: this.questions[this.currentQuestionIndex].questionText, selectedAnswer: '' });
    // } else {
    //   // If an answer was selected, check if it's correct or wrong
    //   if (this.selectedAnswer === this.questions[this.currentQuestionIndex]?.correctAnswer) {
    //     this.correctAnswers++;
    //     this.score++; // Increment score for correct answers
    //   } else {
    //     this.wrongAnswers++;
    //   }
    //   // Add user's answer to the answers array
    //   this.userAnswers.push({ question: this.questions[this.currentQuestionIndex].questionText, selectedAnswer: this.selectedAnswer });
    // }

    if (!timerExpired) {
      if (this.selectedAnswer === null) {
        this.errorMessage = 'Select one answer'; // Set error message if no answer is selected
        return; // Exit the function if no answer is selected
      }

      // Add user's answer to the answers array
      this.userAnswers.push({ question: this.questions[this.currentQuestionIndex].questionText, selectedAnswer: this.selectedAnswer });
      // Calculate score
      this.score += this.calculateScoreForQuestion(this.currentQuestionIndex);
    } else {
      // If the timer expired, push a null answer for that question
      this.userAnswers.push({ question: this.questions[this.currentQuestionIndex].questionText, selectedAnswer: '' });
    }

    // Update timer and move to next question
    this.timer = 30;
    clearInterval(this.interval);
    this.currentQuestionIndex++;
    this.selectedAnswer = null; // Reset selected answer for the next question

    if (this.currentQuestionIndex < this.questions.length) {
      this.startTimer();
    } 
    else {
      this.quizService.score = this.score; // Store final score in QuizService
      this.router.navigate(['quiz-summary']);
      // console.log("Skipped answers:", this.skippedAnswers);
      // console.log("Wrong answers:", this.wrongAnswers);
      // console.log("Correct answers:", this.correctAnswers);
    }
  }

  calculateScoreForQuestion(questionIndex: number): number {
    if (this.userAnswers[questionIndex]?.selectedAnswer === this.questions[questionIndex]?.correctAnswer) {
      return 1;
    }
    return 0;
  }

  moveToNextQuestion() {
    this.timer = 30; // Reset the timer for the next question
    clearInterval(this.interval);
    this.currentQuestionIndex++;
    this.selectedAnswer = null; // Reset selected answer for the next question
    this.errorMessage = null; // Reset error message when an answer is selected

    if (this.currentQuestionIndex < this.questions.length) {
      this.startTimer();
    } else {
      this.quizService.score = this.score; // Store final score in QuizService
      this.router.navigate(['quiz-summary']);
    }
  }
}
