import { formatCurrency, capitalize } from './helper';

describe('helper utilities', () => {
  test('formatCurrency formats correctly', () => {
    expect(formatCurrency(1234.5)).toBe('$1234.50');
  });

  test('capitalize capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
});
