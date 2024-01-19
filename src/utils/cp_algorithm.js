import {ToastAndroid} from 'react-native';

export function checkMoreThanOneZero(number) {
  const numberString = number.toString();
  const zeroCount = (numberString.match(/0/g) || []).length;
  if (zeroCount > 1) {
    return true;
  } else {
    return false;
  }
}

/**
 * The function generates a set of unique three-digit numbers by shuffling the digits of a given
 * five-digit number and returns them in ascending order.
 * @returns The function `generateUniqueThreeDigitNumbersFromFiveDigit` returns an array of unique
 * three-digit numbers, sorted in ascending order.
 */
export const generateUniqueThreeDigitNumbersFromFiveDigit = baseNumber => {
  //   const isMoreThanOneZero = checkMoreThanOneZero(baseNumber);
  //   if (!isMoreThanOneZero) {
  //     ToastAndroid.show(
  //       "You can't add more than 1 zero.",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.CENTER,
  //     );
  //     return;
  //   }
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
