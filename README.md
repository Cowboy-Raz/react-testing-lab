# Lab: Testing Using Vitest

## Overview
This lab implements a testing suite for an existing banking application that allows users to track expenditures by submitting and searching through transactions. The app was already built — the job was to add comprehensive tests using Vitest and fix a missing search feature to make the tests pass.

## Screenshot

![App Screenshot](./screenshot.png)

## Setup

Run `npm install` to install dependencies.

Start the backend:

```bash
npm run server
```

Start the frontend:

```bash
npm run dev
```

Run the test suite:

```bash
npm run test
```

## Features Tested

- **Display Transactions** — Verifies all transactions load from the backend on startup.
- **Add Transactions** — Verifies new transactions appear on the frontend and that a POST request is made to the backend.
- **Search Transactions** — Verifies the transaction list filters in real time based on search input, including case-insensitive matching and clearing the search.

## Test Suites

| Suite | File | Tests |
|---|---|---|
| Display Transactions | `DisplayTransactions.test.jsx` | Loads on startup, shows all transactions, correct details, empty state |
| Add Transactions | `AddTransactions.test.jsx` | Adds to frontend, makes POST request, no duplicates |
| Search & Sort | `SearchSort.test.jsx` | Filters on input, clears correctly, case insensitive, no match state |

## What Was Fixed

The `AccountContainer` component was missing the search filter logic. The filtered transactions are now computed from state and passed to `TransactionsList`, making the search input functional and all tests passing.

The `AddTransactionForm` component was updated to use `e.target.elements` instead of `e.target` to access form fields, which is required for compatibility with jsdom in the test environment.

## Tools and Resources

- [Vitest Documentation](https://vitest.dev/guide/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Best Practices
- Tests are organized into separate suites per feature.
- `beforeEach` used to reset mock fetch responses between tests.
- No unnecessary console logs or commented-out code.

## Submission
Once all tests pass and code is pushed to GitHub, submit the repo through Canvas using CodeGrade.