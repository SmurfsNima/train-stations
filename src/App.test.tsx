import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import { describe, it, expect, vi } from "vitest";

const mockStations = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.5, lng: 13.3 },
  { id: 2, name: "Hamburg Hbf", city: "Hamburg", lat: 53.5, lng: 10.0 },
];

describe("App", () => {
  it("filters stations by city and updates the list", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => mockStations,
      })) as any
    );

    render(<App />);

    // Wait until the list shows both stations
    await waitFor(() => {
      expect(screen.getByText("Berlin Hbf")).toBeInTheDocument();
      expect(screen.getByText("Hamburg Hbf")).toBeInTheDocument();
    });

    // Filter to Berlin
    const select = screen.getByLabelText("City filter");
    fireEvent.change(select, { target: { value: "Berlin" } });

    expect(screen.getByText("Berlin Hbf")).toBeInTheDocument();
    expect(screen.queryByText("Hamburg Hbf")).not.toBeInTheDocument();
  });
});
