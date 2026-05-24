import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  { id: "1", date: "2019-12-01", description: "Paycheck from Bob's Burgers", category: "Income", amount: 1000 },
  { id: "2", date: "2019-12-01", description: "South by Southwest Quinoa Bowl", category: "Food", amount: -10.55 },
  { id: "3", date: "2019-12-04", description: "Sunglasses, Urban Outfitters", category: "Fashion", amount: -24.99 },
];

describe("Search and Sort Transactions", () => {
  beforeEach(() => {
    global.setFetchResponse(mockTransactions);
  });

  test("updates displayed transactions when search input changes", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      { target: { value: "Paycheck" } }
    );

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
      expect(screen.queryByText("South by Southwest Quinoa Bowl")).not.toBeInTheDocument();
      expect(screen.queryByText("Sunglasses, Urban Outfitters")).not.toBeInTheDocument();
    });
  });

  test("shows all transactions when search is cleared", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search your Recent Transactions");

    fireEvent.change(searchInput, { target: { value: "Paycheck" } });
    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
      expect(screen.getByText("South by Southwest Quinoa Bowl")).toBeInTheDocument();
      expect(screen.getByText("Sunglasses, Urban Outfitters")).toBeInTheDocument();
    });
  });

  test("search is case insensitive", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      { target: { value: "paycheck" } }
    );

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    });
  });

  test("shows no transactions when search matches nothing", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      { target: { value: "zzznomatch" } }
    );

    await waitFor(() => {
      expect(screen.queryByText("Paycheck from Bob's Burgers")).not.toBeInTheDocument();
      expect(screen.queryByText("South by Southwest Quinoa Bowl")).not.toBeInTheDocument();
    });
  });
});