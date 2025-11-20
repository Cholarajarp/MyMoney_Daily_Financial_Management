from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class TransactionBase(BaseModel):
    type: str
    category: str
    amount: float
    merchant: str
    date: date
    time: str
    recurring: bool = False
    tags: str

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    class Config:
        orm_mode = True

class BudgetBase(BaseModel):
    category: str
    limit: float
    spent: float
    color: str
    icon: str

class Budget(BudgetBase):
    id: int
    class Config:
        orm_mode = True

class GoalBase(BaseModel):
    name: str
    target: float
    current: float
    deadline: date
    priority: str
    icon: str

class Goal(GoalBase):
    id: int
    class Config:
        orm_mode = True

class BillBase(BaseModel):
    name: str
    amount: float
    due_date: date
    status: str
    auto_pay: bool

class Bill(BillBase):
    id: int
    class Config:
        orm_mode = True

# Dashboard Aggregates
class DashboardData(BaseModel):
    total_income: float
    total_expense: float
    net_savings: float
    health_score_data: List[dict]
    spending_trend: List[dict]
    category_split: List[dict]

class Insight(BaseModel):
    type: str # warning, success, tip
    title: str
    message: str
