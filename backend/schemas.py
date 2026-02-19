from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# User Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None


# Challenge Schemas
class ChallengeBase(BaseModel):
    title: str
    description: str
    level: str
    module_type: str
    expected_output: Optional[str] = None
    image_url: Optional[str] = None
    test_cases: Optional[str] = None
    teaching_objective: Optional[str] = None

class ChallengeCreate(ChallengeBase):
    hint: str
    sample_prompt: str

class Challenge(ChallengeBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ChallengeWithHint(Challenge):
    hint: Optional[str] = None


# Submission Schemas
class SubmissionCreate(BaseModel):
    challenge_id: int
    prompt: str
    generated_output: str

class Submission(BaseModel):
    id: int
    user_id: int
    challenge_id: int
    prompt: str
    generated_output: str
    score: Optional[float] = None
    feedback: Optional[str] = None
    submitted_at: datetime
    
    class Config:
        from_attributes = True


# Progress Schemas
class Progress(BaseModel):
    id: int
    user_id: int
    challenge_id: int
    completed: bool
    best_score: float
    attempts: int
    last_attempt: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class ProgressSummary(BaseModel):
    total_challenges: int
    completed_challenges: int
    total_attempts: int
    average_score: float


# Evaluation Schemas
class EvaluationResult(BaseModel):
    score: float
    feedback: str
    rule_score: float
    similarity_score: float
    suggestions: list[str]
