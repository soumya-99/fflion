/**
 * The function checks if all the digits in a given number are unique.
 * @param number - The number parameter is the input number that we want to check if its digits are
 * unique.
 * @returns The function `areDigitsUnique` returns a boolean value. It returns `true` if all the digits
 * in the given number are unique, and `false` otherwise.
 */
export function areDigitsUnique(number) {
  const numString = number.toString();
  for (let i = 0; i < numString.length; i++) {
    for (let j = i + 1; j < numString.length; j++) {
      if (numString[i] === numString[j]) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The function generates a set of unique three-digit numbers by shuffling the digits of a given
 * five-digit number and returns them in ascending order.
 * @returns The function `generateUniqueThreeDigitNumbersFromFiveDigit` returns an array of unique
 * three-digit numbers, sorted in ascending order.
 */
export const generateUniqueThreeDigitNumbersFromFiveDigit = baseNumber => {
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < 10) {
    const randomCombination = baseNumber
      .toString()
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
    const randomThreeDigits = parseInt(randomCombination.slice(0, 3), 10); // Extract and convert to number
    uniqueNumbers.add(randomThreeDigits);
  }

  const sortedNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);
  return sortedNumbers;
};
