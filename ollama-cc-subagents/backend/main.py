from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import get_db, Expense
from models import ExpenseCreate, ExpenseResponse, CategorySummary

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/expenses", response_model=List[ExpenseResponse])
def get_expenses(db: Session = Depends(get_db)):
    return db.query(Expense).all()


@app.post("/expenses", response_model=ExpenseResponse)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    db_expense = Expense(
        description=expense.description,
        amount=expense.amount,
        category=expense.category
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


@app.delete("/expenses/{id}")
def delete_expense(id: int, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(Expense.id == id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(expense)
    db.commit()
    return {"message": "Expense deleted"}


@app.get("/expenses/summary", response_model=List[CategorySummary])
def get_summary(db: Session = Depends(get_db)):
    expenses = db.query(Expense.category, Expense.amount).all()
    summary_dict = {}
    for category, amount in expenses:
        if category in summary_dict:
            summary_dict[category] += amount
        else:
            summary_dict[category] = amount
    return [CategorySummary(category=cat, total=tot) for cat, tot in summary_dict.items()]
