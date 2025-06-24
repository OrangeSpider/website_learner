export interface Question {
  question: string;
  options: string[];
  answer: number; // index of correct option
}

export const quiz: Question[] = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1,
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
    answer: 0,
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "80°C", "120°C"],
    answer: 1,
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "Java", "C", "JavaScript"],
    answer: 3,
  },
];
