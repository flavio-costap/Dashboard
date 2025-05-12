import { formatCurrencyFn } from "../../utils/formatCurrencyFn";
///\u00A0/g = $
describe('formatCurrencyFn', () => {
  it('should correctly format a value in BRL currency', () => {
    expect(formatCurrencyFn(1234).replace(/\u00A0/g, ' ')).toBe('R$ 1.234');
    expect(formatCurrencyFn(1000000).replace(/\u00A0/g, ' ')).toBe('R$ 1.000.000');
    expect(formatCurrencyFn(0).replace(/\u00A0/g, ' ')).toBe('R$ 0');
    expect(formatCurrencyFn(45.67).replace(/\u00A0/g, ' ')).toBe('R$ 46');
  });

  it('should handle negative values', () => {
    expect(formatCurrencyFn(-1234).replace(/\u00A0/g, ' ')).toBe('-R$ 1.234');
  });

  it('should return currency string with 0 decimal places', () => {
    expect(formatCurrencyFn(1234.5678).replace(/\u00A0/g, ' ')).toBe('R$ 1.235');
  });
});
