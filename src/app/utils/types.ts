export interface RiddleType {
  color: keyof ColorsType;
  question: string;
  answer: string;
  hint: string;
  location: string;
}

export interface ColorsType {
  pink: string;
  yellow: string;
  blue: string;
  purple: string;
  green: string;
  white: string;
}
