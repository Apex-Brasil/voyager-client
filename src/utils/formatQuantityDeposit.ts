export const generateDepositString = (
  quantity: number,
  symbol: string,
  tokenLength: number,
) => {
  const quantityString = quantity.toString();

  let quantityLength: number;

  if (quantityString.includes(".")) {
    quantityLength = quantityString.split(".")[1].length;
  } else {
    quantityLength = quantityString.length;
  }

  const zeros = tokenLength - quantityLength;

  let depositString = "";
  depositString += quantityString;

  for (let i = 0; i < zeros; i++) {
    depositString += "0";
  }

  depositString += " " + symbol;

  return depositString;
};
