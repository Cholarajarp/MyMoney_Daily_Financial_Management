from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from . import models, schemas, crud, database
from .services import insights_engine

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="MyMoney Pro API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/dashboard", response_model=schemas.DashboardData)
def get_dashboard(db: Session = Depends(get_db)):
    income = db.query(func.sum(models.Transaction.amount)).filter(models.Transaction.type == 'income').scalar() or 0
    expense = db.query(func.sum(models.Transaction.amount)).filter(models.Transaction.type == 'expense').scalar() or 0
    
    budgets = db.query(models.Budget).all()
    cat_split = [{"name": b.category, "value": b.spent} for b in budgets if b.spent > 0]
    
    return {
        "total_income": income,
        "total_expense": expense,
        "net_savings": income - expense,
        "health_score_data": insights_engine.calculate_health_score(db),
        "spending_trend": crud.get_spending_trend(db),
        "category_split": cat_split
    }

@app.get("/transactions", response_model=List[schemas.Transaction])
def read_transactions(db: Session = Depends(get_db)):
    return crud.get_transactions(db)

@app.post("/transactions", response_model=schemas.Transaction)
def create_transaction(t: schemas.TransactionCreate, db: Session = Depends(get_db)):
    return crud.create_transaction(db, t)

@app.get("/budgets", response_model=List[schemas.Budget])
def read_budgets(db: Session = Depends(get_db)):
    return crud.get_budgets(db)

@app.get("/goals", response_model=List[schemas.Goal])
def read_goals(db: Session = Depends(get_db)):
    return crud.get_goals(db)

@app.get("/bills", response_model=List[schemas.Bill])
def read_bills(db: Session = Depends(get_db)):
    return crud.get_bills(db)

@app.get("/insights", response_model=List[schemas.Insight])
def read_insights(db: Session = Depends(get_db)):
    return insights_engine.generate_insights(db)
