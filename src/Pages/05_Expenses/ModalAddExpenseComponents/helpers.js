// function isAmount equal takes 2 numbers and returns true or false
export function isAmountEqual(firstAmount, secondAmount) {
 //checks if its a number and returns it *100 as an int
 function validateNum(value) {
  const multipliedValue = value * 100;
  const intValue = parseInt(multipliedValue);
  if (isNaN(intValue)) {
   console.error("Amount must be a number.");
   return false;
  }
  return intValue;
 }
 let num1 = validateNum(firstAmount);
 let num2 = validateNum(secondAmount);
 return (num1 === num2);
}
//function divideAmount takes the amount and the number it should be divided by
//it outputs an object witht the quotient and remainder as string with 2 decimals
export function divideAmount(amount, divisor) {
 if (divisor === 0 || !divisor || Number.isNaN(amount) || Number.isNaN(divisor)) {
  console.error("Numbers required for division.")
  return {
   quotient: 0,
   remainder: 0
  }
 }
 let quotient = (Math.round(amount * 100 / divisor)) / 100;
 let remainder = Math.abs(amount - (quotient * divisor));
 return {
  quotient: quotient.toFixed(2),
  remainder: remainder.toFixed(2), // limit the remainder to 2 decimal places
 };
}