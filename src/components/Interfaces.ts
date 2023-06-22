export interface User extends Record<string, any> {}

export type IQuizSliceState = {
  userData: IUser | null;
  messages: IMessages | null;
  setUserReadyToStartQuiz: {
    idParent: string;
    displayName: string;
    idUser: string;
  } | null;
  quizes: any | null;
};

export type IState = {
  quiz: {
    userData: IUser;
    messages: IMessages[];
    quizes: IQuiz[];
  };
};

export type IUser = {
  idParent?: string;
  score?: number | undefined;
  displayName: string;
  photoUrl: string;
  idUser: string;
};

export type IMessages = {
  // idParent: string;
  idUser: string;
  displayName: string;
  photoUrl: string;
  text: string;
  createdAt: string;
};

export type IQuiz = {
  category: string;
  difficulty: string;
  id: string;
  questions: string[];
  answers: {
    [key: number]: {
      [key: number]: string;
      correct_answer: string;
    };
  };
  status: string;
  users: IUser[];
};

export interface QuizRegistrationProps {
  getCurrentQuizId: (currentQuizId: string) => void;
}

export interface QuizCardProps extends QuizRegistrationProps {
  quiz: IQuiz;
}

export interface QuizProps {
  id: string;
  setIsQuiz: (setIsQuiz: boolean) => void;
}

export type Answer = {
  [key: number]: string;
  correct_answer?: string;
};

export type QuizQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
