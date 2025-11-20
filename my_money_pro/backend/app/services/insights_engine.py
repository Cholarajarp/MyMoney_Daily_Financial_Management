from sqlalchemy.orm import Session
from .. import models

def generate_insights(db: Session):
    insights = []
    
    # 1. Check Budgets
    budgets = db.query(models.Budget).all()
    for b in budgets:
        if b.limit > 0:
            pct = (b.spent / b.limit) * 100
            if pct > 90:
                insights.append({
                    "type": "warning", "title": "Budget Critical",
                    "message": f"You've used {int(pct)}% of your {b.category} budget."
                })
            elif pct > 75:
                insights.append({
                    "type": "warning", "title": "Budget Alert",
                    "message": f"You've used {int(pct)}% of your {b.category} budget."
                })

    # 2. Savings Rate
    income = db.query(models.func.sum(models.Transaction.amount)).filter(models.Transaction.type == 'income').scalar() or 0
    expense = db.query(models.func.sum(models.Transaction.amount)).filter(models.Transaction.type == 'expense').scalar() or 0
    
    if income > 0:
        savings_rate = ((income - expense) / income) * 100
        if savings_rate > 20:
            insights.append({
                "type": "success", "title": "Great Saving!",
                "message": f"Your savings rate is a healthy {int(savings_rate)}%."
            })
        else:
            insights.append({
                "type": "tip", "title": "Save More",
                "message": "Try to follow the 50/30/20 rule to improve savings."
            })
            
    return insights

def calculate_health_score(db: Session):
    # Mock Logic for demonstration
    return [
        {"subject": 'Savings', "A": 85, "fullMark": 100},
        {"subject": 'Budget', "A": 72, "fullMark": 100},
        {"subject": 'Spending', "A": 68, "fullMark": 100},
        {"subject": 'Goals', "A": 90, "fullMark": 100},
        {"subject": 'Bills', "A": 95, "fullMark": 100},
    ]
