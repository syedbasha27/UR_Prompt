from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class ChallengeBase(BaseModel):
    title: str
    description: str
    level: str
    module_type: Optional[str] = None
    expected_output: Optional[str] = None
    hint: Optional[str] = None
    teaching_objective: Optional[str] = None

class ChallengeCreate(ChallengeBase):
    pass

class Challenge(ChallengeBase):
    id: int

    class Config:
        from_attributes = True

class SubmissionBase(BaseModel):
    user_id: int
    challenge_id: int
    code: str

class SubmissionCreate(SubmissionBase):
    pass

class Submission(SubmissionBase):
    id: int
    score: Optional[int] = None

    class Config:
        from_attributes = True

class Score(BaseModel):
    user_id: int
    challenge_id: int
    score: int

class LeaderboardEntry(BaseModel):
    user_id: int
    total_score: int

class LeaderboardResponse(BaseModel):
    entries: List[LeaderboardEntry]


# Authentication schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class UserLogin(BaseModel):
    username: str
    password: str