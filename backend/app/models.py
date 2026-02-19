from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    submissions = relationship("Submission", back_populates="owner")

class Challenge(Base):
    __tablename__ = 'challenges'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    prompt = Column(String)
    level = Column(String)
    submissions = relationship("Submission", back_populates="challenge")

class Submission(Base):
    __tablename__ = 'submissions'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    challenge_id = Column(Integer, ForeignKey('challenges.id'))
    code = Column(String)
    result = Column(String)
    owner = relationship("User", back_populates="submissions")
    challenge = relationship("Challenge", back_populates="submissions")

class Score(Base):
    __tablename__ = 'scores'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    score = Column(Integer)
    owner = relationship("User")

class Progress(Base):
    __tablename__ = 'progress'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    challenge_id = Column(Integer, ForeignKey('challenges.id'))
    completed = Column(Integer)  # 0 for not completed, 1 for completed
    owner = relationship("User")