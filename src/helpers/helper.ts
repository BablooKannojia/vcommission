export const formatCurrency = (amount: number): string =>
  `$${amount.toFixed(2)}`;

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
