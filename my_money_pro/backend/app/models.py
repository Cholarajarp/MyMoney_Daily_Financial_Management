from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Date
from sqlalchemy.orm import relationship
from .database import Base

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)  # income, expense
    category = Column(String)
    amount = Column(Float)
    merchant = Column(String)
    date = Column(Date)
    time = Column(String)
    recurring = Column(Boolean, default=False)
    tags = Column(String)  # Store as comma-separated string

class Budget(Base):
    __tablename__ = "budgets"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, unique=True)
    limit = Column(Float)
    spent = Column(Float, default=0)
    color = Column(String)
    icon = Column(String)

class Goal(Base):
    __tablename__ = "goals"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    target = Column(Float)
    current = Column(Float)
    deadline = Column(Date)
    priority = Column(String) # high, medium, low
    icon = Column(String)

class Bill(Base):
    __tablename__ = "bills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    amount = Column(Float)
    due_date = Column(Date)
    status = Column(String) # pending, paid
    auto_pay = Column(Boolean)
