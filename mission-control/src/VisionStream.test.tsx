import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import VisionStream from "./VisionStream";

describe("VisionStream Component", () => {
  beforeEach(() => {
    let idCounter = 0;
    // Mock crypto.getRandomValues and crypto.randomUUID
    Object.defineProperty(window, "crypto", {
      value: {
        getRandomValues: (arr: Uint32Array) => {
          for (let i = 0; i < arr.length; i++) {
            arr[i] = Math.floor(Math.random() * 0xffffffff);
          }
          return arr;
        },
        randomUUID: () => {
          idCounter++;
          return `1234-5678-9012-${idCounter.toString().padStart(4, "0")}`;
        },
      },
    });
  });

  afterEach(() => {
    // Clean up DOM after each test to prevent multiple components from leaking across tests
    document.body.innerHTML = "";
  });

  it("renders the VisionStream headers and metadata", () => {
    render(<VisionStream />);

    // Check main labels
    expect(screen.getByText("ECO-MIND / YOLOv8 INFERENCE")).toBeInTheDocument();
    expect(screen.getByText("30 FPS")).toBeInTheDocument();
    expect(screen.getByText("HAILO-8L NPU")).toBeInTheDocument();
    expect(screen.getByText(/LATENCY:/)).toBeInTheDocument();
    expect(screen.getByText(/CONFIDENCE THRESHOLD:/)).toBeInTheDocument();

    // Check footer labels
    expect(screen.getByText("RES: 1920x1080")).toBeInTheDocument();
    expect(screen.getByText("ENCODER: H.265")).toBeInTheDocument();
    expect(screen.getByText("MODEL: ecomind-v2-nano.pt")).toBeInTheDocument();
    expect(screen.getByText("RECORDING")).toBeInTheDocument();
  });

  it("renders bounding boxes", async () => {
    render(<VisionStream />);

    // Wait for at least one bounding box to be rendered
    await waitFor(() => {
      const boxes = screen.getAllByRole("button");
      expect(boxes.length).toBeGreaterThan(0);
    });
  });

  it("handles box click to pause and show details", async () => {
    render(<VisionStream />);

    let boxes: HTMLElement[] = [];
    await waitFor(() => {
      boxes = screen.getAllByRole("button");
      expect(boxes.length).toBeGreaterThan(0);
    });

    // Click the first box
    fireEvent.click(boxes[0]);

    // Check if the stream paused text is displayed
    expect(screen.getByText("PAUSED")).toBeInTheDocument();
    expect(screen.getByText("STREAM PAUSED")).toBeInTheDocument();

    // Check if detail panel is shown
    expect(screen.getByText("TARGET LOCKED")).toBeInTheDocument();
    expect(screen.getByText("CLASSIFICATION")).toBeInTheDocument();
    expect(screen.getByText("SPATIAL COORDINATES (REL)")).toBeInTheDocument();
  });

  it("can close the details panel and resume stream", async () => {
    render(<VisionStream />);

    let boxes: HTMLElement[] = [];
    await waitFor(() => {
      boxes = screen.getAllByRole("button");
      expect(boxes.length).toBeGreaterThan(0);
    });

    // Click the first box
    fireEvent.click(boxes[0]);

    expect(screen.getByText("TARGET LOCKED")).toBeInTheDocument();

    // Find and click the close button
    const closeBtn = screen.getByLabelText("Close details panel");
    fireEvent.click(closeBtn);

    // Verify detail panel is gone
    await waitFor(() => {
      expect(screen.queryByText("TARGET LOCKED")).not.toBeInTheDocument();
    });

    // Verify stream resumed
    expect(screen.getByText("30 FPS")).toBeInTheDocument();
    expect(screen.getByText("RECORDING")).toBeInTheDocument();
  });
});
