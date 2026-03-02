# Expense Tracker App

A simple expense tracking application with a Python Flask backend and vanilla HTML/CSS/JS frontend.

## Features

- Add new expenses with category, amount, and description
- View all expenses in a list
- Delete expenses
- Filter expenses by category
- Data persists in a local JSON file
- Responsive design

## Installation

1. Clone the repository
2. Install backend dependencies:

```bash
pip install -r backend/requirements.txt
```

## How to Run

1. Start the backend server first:

```bash
cd backend
python app.py
```

The backend will run on `http://localhost:5000`

2. Open the frontend:

Open `index.html` in your web browser, or serve it using a simple HTTP server:

```bash
python -m http.server 8000
```

Then navigate to `http://localhost:8000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add a new expense |
| DELETE | `/api/expenses/<id>` | Delete an expense |

### POST /api/expenses

Request body (JSON):
```json
{
  "category": "Food",
  "amount": 25.50,
  "description": "Lunch"
}
```

Response:
```json
{
  "id": "uuid",
  "category": "Food",
  "amount": 25.50,
  "description": "Lunch",
  "date": "2026-03-02"
}
```

## Tech Stack

- **Backend**: Python, Flask
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Data Storage**: Local JSON file (expenses.json)
