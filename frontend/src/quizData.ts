export interface Question {
  question: string;
  options: string[];
  answers: number[]; // indices of correct options
  multiple: boolean;
}

export const quiz: Question[] = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answers: [1],
    multiple: false,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answers: [1],
    multiple: false,
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
    answers: [0],
    multiple: false,
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "80°C", "120°C"],
    answers: [1],
    multiple: false,
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "Java", "C", "JavaScript"],
    answers: [3],
    multiple: false,
  },
];
