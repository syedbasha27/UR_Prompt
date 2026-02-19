from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    submissions = relationship("Submission", back_populates="user")
    progress = relationship("Progress", back_populates="user")


class Challenge(Base):
    __tablename__ = "challenges"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    level = Column(String, nullable=False)  # Beginner, Intermediate, Advanced
    module_type = Column(String, nullable=False)  # image, script, code
    expected_output = Column(Text)  # Expected description or behavior
    image_url = Column(String)  # For image prompting challenges
    test_cases = Column(Text)  # JSON string for code challenges
    hint = Column(Text)
    teaching_objective = Column(String)  # role, format, constraints, etc.
    sample_prompt = Column(Text)  # Example of a good prompt
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    submissions = relationship("Submission", back_populates="challenge")


class Submission(Base):
    __tablename__ = "submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    challenge_id = Column(Integer, ForeignKey("challenges.id"), nullable=False)
    prompt = Column(Text, nullable=False)
    generated_output = Column(Text, nullable=False)
    score = Column(Float)
    feedback = Column(Text)
    submitted_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="submissions")
    challenge = relationship("Challenge", back_populates="submissions")


class Progress(Base):
    __tablename__ = "progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    challenge_id = Column(Integer, ForeignKey("challenges.id"), nullable=False)
    completed = Column(Boolean, default=False)
    best_score = Column(Float, default=0.0)
    attempts = Column(Integer, default=0)
    last_attempt = Column(DateTime)
    
    # Relationships
    user = relationship("User", back_populates="progress")
