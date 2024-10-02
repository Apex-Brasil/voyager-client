export const dollarInWaxValues = (
  priceInDollar: string,
  many = 1,
  median: number,
): [number, string] => {
  const amountInDolar = Number(priceInDollar.split(" ")[0]) * many;
  const amountInWax = amountInDolar / (median / 10000);
  const listingPriceInWaxFormatted = amountInWax.toFixed(8) + " WAX";

  return [amountInWax, listingPriceInWaxFormatted];
};

export const waxInDollarValues = (
  priceInWax: string,
  many = 1,
  median: number,
): [number, string] => {
  const amountInWax = Number(priceInWax.split(" ")[0]) * many;
  const amountInDolar = amountInWax * (median / 10000);
  const listingPriceInDolarFormatted = "$" + amountInDolar.toFixed(2);

  return [amountInDolar, listingPriceInDolarFormatted];
};
