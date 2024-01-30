export interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
    correctedText: string
  },
  audioUrl?: string;
}
