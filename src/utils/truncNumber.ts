export function roundedNumber(number: number) {
  const wholePart = Math.trunc(number);

  const decimalPart = number - wholePart;

  if (decimalPart >= 0.5) {
    return wholePart + 1;
  } else {
    return wholePart;
  }
}
