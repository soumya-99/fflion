/**
 * The function checks if all the digits in a given number are unique.
 * @param number - The number parameter is the input number that we want to check if its digits are
 * unique.
 * @returns The function `areDigitsUnique` returns a boolean value. It returns `true` if all the digits
 * in the given number are unique, and `false` otherwise.
 */
// export function areDigitsUnique(number) {
//   const numString = number.toString();
//   for (let i = 0; i < numString.length; i++) {
//     for (let j = i + 1; j < numString.length; j++) {
//       if (numString[i] === numString[j]) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

export function areDigitsUnique(number) {
  const digits = String(number).split('');
  const uniqueDigits = new Set(digits);
  return uniqueDigits.size === digits.length;
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

/**
 * The function `generatePermutations` takes an input number, sorts its digits in ascending order, and
 * generates all possible three-digit permutations of the digits.
 * @param inputNumber - The inputNumber parameter is the number for which we want to generate
 * permutations.
 * @returns The function `generatePermutations` returns an array of permutations. Each permutation is a
 * three-digit number formed by selecting three digits from the input number and arranging them in
 * ascending order.
 */
export function generatePermutations(inputNumber) {
  let lastZero;
  const digits = String(inputNumber).split('').map(Number);
  if (digits[digits.length - 1] === 0) {
    lastZero = digits.pop();
    digits.sort((a, b) => a - b);
    digits.push(lastZero);
  } else {
    digits.sort((a, b) => a - b);
  }
  const permutations = [];

  for (let i = 0; i < digits.length - 2; i++) {
    for (let j = i + 1; j < digits.length - 1; j++) {
      for (let k = j + 1; k < digits.length; k++) {
        permutations.push(digits[i] * 100 + digits[j] * 10 + digits[k]);
      }
    }
  }

  return permutations;
}

// Optimized version of the previous function
// export function findPermute(input, k, res, temp, i) {
//   let sortedNumber = input
//     .split('')
//     .map(Number)
//     .sort((a, b) => a - b)
//     .join('');

//   // if (sortedNumber[sortedNumber.length - 1] === 0) {
//   //   lastZero = sortedNumber.pop();
//   //   sortedNumber.sort((a, b) => a - b);
//   //   sortedNumber.push(lastZero);
//   // } else {
//   //   sortedNumber.sort((a, b) => a - b).join('');
//   // }

//   if (temp.length === k) {
//     res.push(temp.join('')); // Join the characters to form a string
//     return;
//   }

//   for (let j = i; j < sortedNumber.length; j++) {
//     temp.push(sortedNumber[j]);
//     findPermute(sortedNumber, k, res, temp, j + 1);
//     temp.pop();
//   }
// }

export function findPermute(input, k, res, temp, i) {
  let sortedNumber;

  // Check if the input contains 0, exclude the last 0 before sorting
  if (input.includes('0')) {
    let withoutLastZero = input.replace(/0/g, '');
    sortedNumber =
      withoutLastZero
        .split('')
        .map(Number)
        .sort((a, b) => a - b)
        .join('') + '0';
  } else {
    sortedNumber = input
      .split('')
      .map(Number)
      .sort((a, b) => a - b)
      .join('');
  }

  if (temp.length === k) {
    res.push(temp.join(''));
    return;
  }

  for (let j = i; j < sortedNumber.length; j++) {
    temp.push(sortedNumber[j]);
    findPermute(sortedNumber, k, res, temp, j + 1);
    temp.pop();
  }
}
