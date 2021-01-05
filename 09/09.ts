import * as fs from "file-system";
// Read in puzzle input data.
const data = fs.readFileSync("./puzzle-09a-input.txt", "utf8");
const dataFilesLines = data.split(/\r?\n/);
const formattedInputData = dataFilesLines.map((input: string) =>
  parseInt(input)
);

// In this example, after the 5-number preamble, almost every number is the sum of two of the previous 5 numbers; the only number that does not follow this rule is 127.
const example = {
  input: [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576,
  ],
  lookbackLength: 5,
  badNumber: 127,
  encryptionWeakness: 62,
};

const findBadNumberInChain = (
  numberChain: number[],
  lookbackLength: number
): number => {
  let problemNumbers = [];
  for (let $i = lookbackLength; $i < numberChain.length; $i++) {
    const targetValue = numberChain[$i];
    const chainChunk = numberChain.slice($i - lookbackLength, $i);
    // Fill set with all posibilities.
    const possibilities = new Set();
    chainChunk.forEach((firstNumber: number) => {
      chainChunk.forEach((secondNumber: number) => {
        const possibleNumber = firstNumber + secondNumber;
        possibilities.add(possibleNumber);
      });
    });
    // Check for the target within the possibilities.
    if (!possibilities.has(targetValue)) {
      problemNumbers.push(targetValue);
    }
  }
  // Sanity check.
  if (problemNumbers.length === 1) {
    // Return final value
    return problemNumbers[0];
  } else {
    throw new Error(
      `Too many problemNumbers; SHOULD only be one problemNumber`
    );
  }
};

// Check the example inputs produce the expected output.
console.assert(
  findBadNumberInChain(example.input, example.lookbackLength) ===
    example.badNumber,
  `Provided example for findBadNumberInChain() has not passed test`
);

/**
 * Problem 09a
 * The first step of attacking the weakness in the XMAS data
 * is to find the first number in the list (after the preamble)
 * which is not the sum of two of the 25 numbers before it.
 * What is the first number that does not have this property?
 */

const lookbackLength09a = 25;
const answer09a = findBadNumberInChain(formattedInputData, lookbackLength09a);
// Print 09a result.
console.log(
  `Answer for puzzle 09a`,
  answer09a,
  answer09a === 50047984 ? `(Confirmed correct answer)` : `(Incorrect answer)`
);
// Correct answer for 09a was 50047984.

/**
 * Problem 09b
 * What is the encryption weakness in your XMAS-encrypted list of numbers?
 */

const findEncryptionWeakness = (
  numberChain: number[],
  lookBack: number
): number => {
  const badNumber: number = findBadNumberInChain(numberChain, lookBack);
  let contigiousSequence: number[];

  startNumberLoop: for (
    let startNumberIndex: number = 0;
    startNumberIndex < numberChain.length;
    startNumberIndex++
  ) {
    if (contigiousSequence) {
      break startNumberLoop;
    }
    let total = 0;
    for (
      let currentIndex = startNumberIndex;
      currentIndex < numberChain.length;
      currentIndex++
    ) {
      total += numberChain[currentIndex];
      if (total > badNumber) {
        break;
      }
      if (total === badNumber && currentIndex > startNumberIndex) {
        contigiousSequence = numberChain.slice(
          startNumberIndex,
          currentIndex + 1
        );
        break startNumberLoop;
      }
    }
  }
  // ContigiousSequence shoul sum to badNumber.
  console.assert(
    badNumber === contigiousSequence.reduce((acc, curr) => acc + curr, 0),
    `Sequence should sum to badNumber but values were ${badNumber}:${contigiousSequence.reduce(
      (acc, curr) => acc + curr,
      0
    )}`
  );
  // To find the encryption weakness, add together the smallest and largest number in this contiguous range
  return Math.min(...contigiousSequence) + Math.max(...contigiousSequence);
};

// Check the example inputs produce the expected output.
console.assert(
  findEncryptionWeakness(example.input, example.lookbackLength) ===
    example.encryptionWeakness,
  `Provided example for findEncryptionWeakness() has not passed test: ${findEncryptionWeakness(
    example.input,
    example.lookbackLength
  )} should be ${example.encryptionWeakness}.`
);

// What is the encryption weakness in your XMAS-encrypted list of numbers?
const answer09b = findEncryptionWeakness(formattedInputData, lookbackLength09a);
// Print 09b result.
console.log(
  `Answer for puzzle 09b`,
  answer09b,
  answer09b === 5407707 ? `(Confirmed correct answer)` : `(Incorrect answer)`
);
// Correct answer for 09b was 5407707.
