import { abbreviateNumberFn } from "../../utils/abbreviateNumberFn";

describe("abbreviateNumberFn", () => {
  it("should abbreviate numbers in thousands", () => {
    expect(abbreviateNumberFn(1000)).toBe("1.0k");
    expect(abbreviateNumberFn(2500)).toBe("2.5k");
  });

  it("should abbreviate numbers in millions", () => {
    expect(abbreviateNumberFn(1_000_000)).toBe("1.0M");
    expect(abbreviateNumberFn(2_500_000)).toBe("2.5M");
  });

  it("should return exact number when below 1000", () => {
    expect(abbreviateNumberFn(500)).toBe("500");
    expect(abbreviateNumberFn(999)).toBe("999");
  });

  it("should handle negative values", () => {
    expect(abbreviateNumberFn(-1000)).toBe("-1.0k");
    expect(abbreviateNumberFn(-1_000_000)).toBe("-1.0M");
    expect(abbreviateNumberFn(-500)).toBe("-500");
  });

  it("should handle zero correctly", () => {
    expect(abbreviateNumberFn(0)).toBe("0");
  });
});
