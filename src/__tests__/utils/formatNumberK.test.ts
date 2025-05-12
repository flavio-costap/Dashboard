import { formatNumberK } from "../../utils/formatNumberK";

describe('formatNumberK', () => {
  it('should format numbers above 1000 with "k"', () => {
    expect(formatNumberK(1500)).toBe('2k');
    expect(formatNumberK(2500)).toBe('3k');
    expect(formatNumberK(1000000)).toBe('1000k');
  });

  it('should return the number as is if it is less than 1000', () => {
    expect(formatNumberK(500)).toBe('500');
    expect(formatNumberK(0)).toBe('0');
    expect(formatNumberK(999)).toBe('999');
  });

  it('should handle negative numbers correctly', () => {
    expect(formatNumberK(-1500)).toBe('-2k');
    expect(formatNumberK(-2500)).toBe('-3k');
    expect(formatNumberK(-1000000)).toBe('-1000k');
  });

  it('should handle negative numbers less than 1000', () => {
    expect(formatNumberK(-500)).toBe('-500');
    expect(formatNumberK(-999)).toBe('-999');
  });
});