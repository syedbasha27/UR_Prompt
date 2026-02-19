export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  level: string;
  module_type: string;
  expected_output?: string;
  image_url?: string;
  test_cases?: string;
  teaching_objective?: string;
  created_at: string;
}

export interface ChallengeWithHint extends Challenge {
  hint?: string;
}

export interface Submission {
  id: number;
  user_id: number;
  challenge_id: number;
  prompt: string;
  generated_output: string;
  score?: number;
  feedback?: string;
  submitted_at: string;
}

export interface Progress {
  id: number;
  user_id: number;
  challenge_id: number;
  completed: boolean;
  best_score: number;
  attempts: number;
  last_attempt?: string;
}

export interface ProgressSummary {
  total_challenges: number;
  completed_challenges: number;
  total_attempts: number;
  average_score: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface SubmissionCreate {
  challenge_id: number;
  prompt: string;
  generated_output: string;
}