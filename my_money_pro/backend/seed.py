from app.database import SessionLocal, engine, Base
from app import models
from datetime import date

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# 1. Budgets
budgets = [
    models.Budget(category='Food', limit=12000, spent=0, icon='Utensils', color='#f97316'),
    models.Budget(category='Transport', limit=5000, spent=0, icon='Car', color='#3b82f6'),
    models.Budget(category='Shopping', limit=10000, spent=0, icon='ShoppingBag', color='#ec4899'),
    models.Budget(category='Entertainment', limit=4000, spent=0, icon='Gamepad', color='#8b5cf6'),
]
db.add_all(budgets)
db.commit()

# 2. Transactions (Will auto-update budget spent via CRUD logic in real app, but here manual for seed)
transactions = [
    models.Transaction(type='income', category='Salary', amount=85000, merchant='Tech Corp', date=date(2025, 11, 18), time='12:00 PM', recurring=True, tags='work,monthly'),
    models.Transaction(type='expense', category='Food', amount=850, merchant='Starbucks', date=date(2025, 11, 20), time='09:30 AM', tags='coffee,morning'),
    models.Transaction(type='expense', category='Transport', amount=450, merchant='Uber', date=date(2025, 11, 19), time='06:45 PM', tags='ride,work'),
    models.Transaction(type='expense', category='Shopping', amount=3200, merchant='Amazon', date=date(2025, 11, 17), time='08:20 PM', tags='gadgets'),
    models.Transaction(type='expense', category='Entertainment', amount=1250, merchant='Netflix', date=date(2025, 11, 25), time='10:00 AM', tags='subscription'),
]

for t in transactions:
    db.add(t)
    # Update budget spent manually for seed
    if t.type == 'expense':
        b = db.query(models.Budget).filter(models.Budget.category == t.category).first()
        if b: b.spent += t.amount

# 3. Goals
goals = [
    models.Goal(name='Emergency Fund', target=200000, current=125000, deadline=date(2025, 12, 31), priority='high', icon='🛡️'),
    models.Goal(name='Goa Trip', target=60000, current=42000, deadline=date(2025, 6, 30), priority='medium', icon='✈️'),
]
db.add_all(goals)

# 4. Bills
bills = [
    models.Bill(name='Netflix', amount=649, due_date=date(2025, 11, 25), status='pending', auto_pay=True),
    models.Bill(name='Electricity', amount=1200, due_date=date(2025, 11, 22), status='pending', auto_pay=False),
]
db.add_all(bills)

db.commit()
db.close()
print("Database seeded successfully!")
