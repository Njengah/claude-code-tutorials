"""
Test script for FastAPI expense tracker endpoints.
Run with: python test_endpoints.py

This script tests:
- GET /expenses - Retrieve all expenses
- POST /expenses - Create a new expense
- GET /expenses/summary - Get category summary
- DELETE /expenses/{id} - Delete an expense
"""

import httpx
import sys
from typing import Dict, Any

# Base URL for the API
BASE_URL = "http://127.0.0.1:8000"

# Test data
TEST_EXPENSE = {
    "description": "Test expense",
    "amount": 50.00,
    "category": "Test"
}


def test_create_expense(client: httpx.Client) -> Dict[str, Any]:
    """Test creating a new expense."""
    print("\n[TEST] Creating expense...")
    response = client.post(f"{BASE_URL}/expenses", json=TEST_EXPENSE)

    assert response.status_code == 200, f"Expected 200, got {response.status_code}"

    data = response.json()
    assert "id" in data, "Response should include 'id'"
    assert data["description"] == TEST_EXPENSE["description"], "Description mismatch"
    assert data["amount"] == TEST_EXPENSE["amount"], "Amount mismatch"
    assert data["category"] == TEST_EXPENSE["category"], "Category mismatch"

    print(f"  PASS: Created expense with id={data['id']}")
    return data


def test_get_expenses(client: httpx.Client, created_expense: Dict[str, Any]):
    """Test retrieving all expenses."""
    print("\n[TEST] Getting all expenses...")
    response = client.get(f"{BASE_URL}/expenses")

    assert response.status_code == 200, f"Expected 200, got {response.status_code}"

    expenses = response.json()
    assert isinstance(expenses, list), "Response should be a list"

    # Verify our created expense is in the list
    expense_ids = [e["id"] for e in expenses]
    assert created_expense["id"] in expense_ids, "Created expense should be in list"

    print(f"  PASS: Retrieved {len(expenses)} expense(s)")
    return expenses


def test_get_summary(client: httpx.Client):
    """Test getting category summary."""
    print("\n[TEST] Getting category summary...")
    response = client.get(f"{BASE_URL}/expenses/summary")

    assert response.status_code == 200, f"Expected 200, got {response.status_code}"

    summary = response.json()
    assert isinstance(summary, list), "Response should be a list"

    # Check structure of summary items
    for item in summary:
        assert "category" in item, "Summary item should have 'category'"
        assert "total" in item, "Summary item should have 'total'"

    print(f"  PASS: Retrieved summary with {len(summary)} category(ies)")
    return summary


def test_delete_expense(client: httpx.Client, created_expense: Dict[str, Any]):
    """Test deleting an expense."""
    print("\n[TEST] Deleting expense...")
    expense_id = created_expense["id"]
    response = client.delete(f"{BASE_URL}/expenses/{expense_id}")

    assert response.status_code == 200, f"Expected 200, got {response.status_code}"

    data = response.json()
    assert "message" in data, "Response should include 'message'"

    print(f"  PASS: Deleted expense with id={expense_id}")


def test_delete_nonexistent(client: httpx.Client):
    """Test deleting a non-existent expense returns 404."""
    print("\n[TEST] Deleting non-existent expense...")
    response = client.delete(f"{BASE_URL}/expenses/99999")

    assert response.status_code == 404, f"Expected 404, got {response.status_code}"

    print("  PASS: Correctly returned 404 for non-existent expense")


def main():
    """Run all tests."""
    print("=" * 50)
    print("FastAPI Endpoint Tests")
    print("=" * 50)

    # Check if server is running
    print("\nChecking if server is running...")
    try:
        with httpx.Client() as client:
            # Test connection
            response = client.get(f"{BASE_URL}/expenses", timeout=5.0)
            print("  Server is responding")
    except httpx.ConnectError:
        print(f"  ERROR: Cannot connect to server at {BASE_URL}")
        print("  Please start the server with: uvicorn backend.main:app --reload")
        sys.exit(1)
    except Exception as e:
        print(f"  ERROR: {e}")
        sys.exit(1)

    # Run tests
    try:
        with httpx.Client(timeout=10.0) as client:
            # Test 1: Create expense
            created_expense = test_create_expense(client)

            # Test 2: Get all expenses
            test_get_expenses(client, created_expense)

            # Test 3: Get summary
            test_get_summary(client)

            # Test 4: Delete expense
            test_delete_expense(client, created_expense)

            # Test 5: Delete non-existent (should fail with 404)
            test_delete_nonexistent(client)

    except AssertionError as e:
        print(f"\n  FAIL: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n  ERROR: {e}")
        sys.exit(1)

    print("\n" + "=" * 50)
    print("All tests PASSED!")
    print("=" * 50)


if __name__ == "__main__":
    main()
