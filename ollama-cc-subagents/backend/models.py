from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ExpenseCreate(BaseModel):
    description: str
    amount: float
    category: str


class ExpenseResponse(ExpenseCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CategorySummary(BaseModel):
    category: str
    total: float
