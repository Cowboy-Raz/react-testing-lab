import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
  { id: "2", date: "2019-12-01", description: "South by Southwest Quinoa Bowl at Fresh & Co", category: "Food", amount: -10.55 },
  { id: "3", date: "2019-12-04", description: "Sunglasses, Urban Outfitters", category: "Fashion", amount: -24.99 },
];

describe("Display Transactions", () => {
  beforeEach(() => {
    global.setFetchResponse(mockTransactions);
  });

  test("displays transactions on startup", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    });
  });

  test("displays all transactions from the backend", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
      expect(screen.getByText("South by Southwest Quinoa Bowl at Fresh & Co")).toBeInTheDocument();
      expect(screen.getByText("Sunglasses, Urban Outfitters")).toBeInTheDocument();
    });
  });

  test("displays correct transaction details", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Income")).toBeInTheDocument();
      expect(screen.getByText("1000")).toBeInTheDocument();
      expect(screen.getAllByText("2019-12-01").length).toBeGreaterThan(0);
    });
  });

  test("displays empty list when no transactions exist", async () => {
    global.setFetchResponse([]);
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText("Paycheck from Bob's Burgers")).not.toBeInTheDocument();
    });
  });
});