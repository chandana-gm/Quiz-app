import { Injectable } from '@angular/core';
import { Question } from '../interface/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {
  score: number = 0;
  private questions: Question[] = [
    {
      questionText: 'Which planet is known as the Red Planet?',
      options: this.shuffleArray(['Jupiter', 'Saturn', 'Mars', 'Neptune']),
      correctAnswer: 'Mars'
    },
    {
      questionText: 'Who discovered penicillin?',
      options: this.shuffleArray(['Alexander Fleming', 'Marie Curie', 'Louis Pasteur', 'Robert Koch']),
      correctAnswer: 'Alexander Fleming'
    },
    {
      questionText: 'In which country would you find the Great Barrier Reef?',
      options: this.shuffleArray(['Australia', 'Brazil', 'Mexico', 'India']),
      correctAnswer: 'Australia'
    },
    {
      questionText: 'Which chemical element has the symbol "Fe"?',
      options: this.shuffleArray(['Iron', 'Gold', 'Silver', 'Copper']),
      correctAnswer: 'Iron'
    },
    {
      questionText: 'Who painted the Mona Lisa?',
      options: this.shuffleArray(['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Michelangelo']),
      correctAnswer: 'Leonardo da Vinci'
    },
    {
      questionText: 'Which ocean is the largest?',
      options: this.shuffleArray(['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean']),
      correctAnswer: 'Pacific Ocean'
    },
    {
      questionText: 'What is the tallest mountain in the world?',
      options: this.shuffleArray(['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu']),
      correctAnswer: 'Mount Everest'
    },
    {
      questionText: 'Who is the author of "1984"?',
      options: this.shuffleArray(['George Orwell', 'J.K. Rowling', 'Ernest Hemingway', 'F. Scott Fitzgerald']),
      correctAnswer: 'George Orwell'
    },
    {
      questionText: 'Which city hosted the 2016 Summer Olympics?',
      options: this.shuffleArray(['Rio de Janeiro', 'Tokyo', 'London', 'Beijing']),
      correctAnswer: 'Rio de Janeiro'
    },
    {
      questionText: 'What is the longest river in the world?',
      options: this.shuffleArray(['Nile', 'Amazon', 'Yangtze', 'Mississippi']),
      correctAnswer: 'Nile'
    },
    {
      questionText: 'Who is known as the "Father of Computers"?',
      options: this.shuffleArray(['Charles Babbage', 'Alan Turing', 'Ada Lovelace', 'John von Neumann']),
      correctAnswer: 'Charles Babbage'
    },
    {
      questionText: 'Which famous physicist developed the theory of relativity?',
      options: this.shuffleArray(['Albert Einstein', 'Isaac Newton', 'Niels Bohr', 'Stephen Hawking']),
      correctAnswer: 'Albert Einstein'
    },
    {
      questionText: 'What is the largest organ in the human body?',
      options: this.shuffleArray(['Skin', 'Liver', 'Heart', 'Brain']),
      correctAnswer: 'Skin'
    },
    {
      questionText: 'Who painted the ceiling of the Sistine Chapel?',
      options: this.shuffleArray(['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Titian']),
      correctAnswer: 'Michelangelo'
    },
    {
      questionText: 'In which year did the Berlin Wall fall?',
      options: this.shuffleArray(['1989', '1991', '1985', '1993']),
      correctAnswer: '1989'
    },
    {
      questionText: 'Which planet is known as the "Morning Star" or "Evening Star"?',
      options: this.shuffleArray(['Venus', 'Mercury', 'Mars', 'Jupiter']),
      correctAnswer: 'Venus'
    },
    {
      questionText: 'Who is the Greek god of war?',
      options: this.shuffleArray(['Ares', 'Zeus', 'Poseidon', 'Hades']),
      correctAnswer: 'Ares'
    },
    {
      questionText: 'Who wrote "Pride and Prejudice"?',
      options: this.shuffleArray(['Jane Austen', 'Emily Brontë', 'Charlotte Brontë', 'Mary Shelley']),
      correctAnswer: 'Jane Austen'
    },
    {
      questionText: 'What is the smallest bone in the human body?',
      options: this.shuffleArray(['Stapes (in the ear)', 'Femur', 'Radius', 'Humerus']),
      correctAnswer: 'Stapes (in the ear)'
    },
    {
      questionText: 'Which animal is known as the "King of the Jungle"?',
      options: this.shuffleArray(['Lion', 'Tiger', 'Elephant', 'Leopard']),
      correctAnswer: 'Lion'
    }
  ];

  private shuffledQuestions: Question[] = []; // Store shuffled questions here

  constructor() {
    this.shuffleQuestions();
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private shuffleQuestions() {
    this.shuffledQuestions = this.shuffleArray([...this.questions]);
  }

  // Get 10 random questions
  getQuestions(): Question[] {
    return this.shuffledQuestions.slice(0, 10);
  }

  // Reset and shuffle questions
  retryQuiz() {
    this.shuffleQuestions();
  }
}
