import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
];

const newTransaction = {
  id: "2",
  date: "2019-12-05",
  description: "New Coffee Shop",
  category: "Food",
  amount: -5.50,
};

describe("Add Transactions", () => {
  beforeEach(() => {
    global.setFetchResponse(mockTransactions);
  });

  test("adds a new transaction to the frontend after form submission", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    });

    global.setFetchResponse(newTransaction);

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "New Coffee Shop" },
    });
    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Food" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "-5.50" },
    });

    // Submit form directly to avoid date field issue
    const form = screen.getByPlaceholderText("Description").closest("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("New Coffee Shop")).toBeInTheDocument();
    });
  });

  test("makes a POST request when form is submitted", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    });

    global.setFetchResponse(newTransaction);

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "New Coffee Shop" },
    });

    const form = screen.getByPlaceholderText("Description").closest("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/transactions",
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  test("does not duplicate existing transactions after adding a new one", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByText("Paycheck from Bob's Burgers")).toHaveLength(1);
    });

    global.setFetchResponse(newTransaction);

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "New Coffee Shop" },
    });

    const form = screen.getByPlaceholderText("Description").closest("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByText("Paycheck from Bob's Burgers")).toHaveLength(1);
    });
  });
});