# MyMoney Pro

A full-stack personal finance management application with FastAPI backend and vanilla JavaScript frontend.

## Project Structure

```
my_money_pro/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI app and endpoints
│   │   ├── database.py       # SQLAlchemy configuration
│   │   ├── models.py         # Database models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── crud.py           # CRUD operations
│   │   └── services/
│   │       ├── __init__.py
│   │       └── insights_engine.py  # AI insights generation
│   ├── seed.py               # Database seeding script
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── index.html            # Main HTML page
│   ├── styles.css            # Custom styles & glassmorphism
│   └── app.js                # Frontend logic with Chart.js
└── README.md
```

## Features

- **Dashboard**: Overview of financial health with key metrics
- **Transaction Management**: Add, view, and categorize transactions
- **Budget Tracking**: Monitor spending against budgets with visual progress bars
- **AI Insights**: Smart recommendations based on spending patterns
- **Financial Health Score**: Radar chart showing savings, budget, spending, goals, and bills health
- **Spending Trends**: Line chart visualization of monthly spending vs savings
- **Category Split**: Doughnut chart showing expense distribution
- **Dark/Light Mode**: Toggle between themes
- **Privacy Mode**: Hide amounts with a click

## Backend Setup

### Prerequisites
- Python 3.9+
- pip

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Seed the database with sample data:
   ```bash
   python seed.py
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

The API will be available at `http://localhost:8000`.

API Endpoints:
- `GET /dashboard` - Get dashboard data (income, expenses, charts data)
- `GET /transactions` - Get all transactions
- `POST /transactions` - Create a new transaction
- `GET /budgets` - Get all budgets
- `GET /goals` - Get all goals
- `GET /bills` - Get all bills
- `GET /insights` - Get AI-generated insights

## Frontend Setup

### Prerequisites
- A modern web browser
- Python 3.6+ (for serving files)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Start a simple HTTP server:
   ```bash
   python -m http.server 3000
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Technology Stack

### Backend
- **FastAPI**: Modern web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Lightweight database
- **Pydantic**: Data validation with Python type hints

### Frontend
- **Vanilla JavaScript**: No framework dependencies
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: JavaScript charting library
- **Lucide Icons**: Beautiful SVG icons
- **Glassmorphism**: Modern UI design pattern

## Database Models

### Transaction
- id, type (income/expense), category, amount, merchant, date, time, recurring, tags

### Budget
- id, category, limit, spent, color, icon

### Goal
- id, name, target, current, deadline, priority, icon

### Bill
- id, name, amount, due_date, status (pending/paid), auto_pay

## API Response Examples

### Dashboard
```json
{
  "total_income": 85000,
  "total_expense": 5750,
  "net_savings": 79250,
  "health_score_data": [
    {"subject": "Savings", "A": 85, "fullMark": 100}
  ],
  "spending_trend": [
    {"month": "Nov", "spending": 47000, "savings": 38000}
  ],
  "category_split": [
    {"name": "Food", "value": 850}
  ]
}
```

### Create Transaction
```json
{
  "type": "expense",
  "category": "Food",
  "amount": 850,
  "merchant": "Starbucks",
  "date": "2025-11-20",
  "time": "09:30 AM",
  "recurring": false,
  "tags": "coffee,morning"
}
```

## Usage Tips

1. **Add Transactions**: Click the "Add" button in the header to quickly add income or expenses
2. **View Insights**: Check the "AI Insights" section for spending recommendations
3. **Monitor Budgets**: The budget progress bars show how much of your budget you've used
4. **Track Trends**: Use the spending trend chart to analyze your spending patterns over time
5. **Privacy Mode**: Click the eye icon to hide all amounts from view

## Seed Data

The application comes pre-loaded with sample data:
- **Budgets**: Food (₹12,000), Transport (₹5,000), Shopping (₹10,000), Entertainment (₹4,000)
- **Transactions**: Income from salary and various expenses across categories
- **Goals**: Emergency Fund and Goa Trip
- **Bills**: Netflix and Electricity

## Customization

### Add New Categories
Edit the `<select id="inp-category">` in `frontend/index.html` to add new categories.

### Modify Budget Limits
Update the budget values in `backend/seed.py` before seeding.

### Change API URL
Update the `API_URL` constant in `frontend/app.js` if running backend on a different address.

## Future Enhancements

- User authentication and profiles
- Recurring transaction automation
- Export data to CSV/PDF
- Mobile app version
- Advanced filtering and search
- Budget notifications
- Investment tracking

## License

MIT License - Feel free to use this project for personal finance management.
