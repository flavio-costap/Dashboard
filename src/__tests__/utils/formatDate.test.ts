import { formatDate } from "../../utils/formatDate";

describe("formatDate", () => {
  it("should handle invalid timestamps gracefully", () => {
    const timestamp = NaN;
    const formattedDate = formatDate(timestamp);
    expect(formattedDate).toBe("Invalid Date");
  });
});
