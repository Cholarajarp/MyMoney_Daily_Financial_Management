from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from . import models, schemas
import datetime

def get_transactions(db: Session, limit: int = 100):
    return db.query(models.Transaction).order_by(models.Transaction.date.desc()).limit(limit).all()

def create_transaction(db: Session, transaction: schemas.TransactionCreate):
    db_obj = models.Transaction(**transaction.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    
    # Update budget spent if expense
    if transaction.type == 'expense':
        budget = db.query(models.Budget).filter(models.Budget.category == transaction.category).first()
        if budget:
            budget.spent += transaction.amount
            db.commit()
            
    return db_obj

def get_budgets(db: Session):
    return db.query(models.Budget).all()

def get_goals(db: Session):
    return db.query(models.Goal).all()

def get_bills(db: Session):
    return db.query(models.Bill).order_by(models.Bill.due_date).all()

def get_spending_trend(db: Session):
    # Simplified: Mock data structure logic or aggregation
    # In a real app, group by month using SQL
    return [
        {"month": "Jun", "spending": 45000, "savings": 25000},
        {"month": "Jul", "spending": 52000, "savings": 18000},
        {"month": "Aug", "spending": 48000, "savings": 20000},
        {"month": "Sep", "spending": 55000, "savings": 20000},
        {"month": "Oct", "spending": 51000, "savings": 21000},
        {"month": "Nov", "spending": 47000, "savings": 38000},
    ]
