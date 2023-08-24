export interface User {
  id: number;
  username: string;
}

export interface CreatedExerciseResponse {
  userId: number;
  exerciseId: number;
  duration: number;
  description: string;
  date: string;
}

export interface Exercise {
  id: number;
  description: string;
  duration: number;
  date: string;
}

export interface UserExerciseLog extends User {
  logs: Exercise[];
  count: number;
}

export enum ENDPOINTS_TYPE {
  API_USERS = '/api/users',
  API_USER = '/api/user',
  API_USERS_BY_USERNAME = '/api/users/:username',
  API_CREATE_EXERCISES = '/api/users/:id/exercises',
  API_USERS_LOGS = '/api/users/:id/logs',
}
