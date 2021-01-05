import * as fs from "file-system";

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
  expected: 127,
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
    example.expected,
  `Provided example has not passed test`
);

/**
 * Problem 09a
 * The first step of attacking the weakness in the XMAS data
 * is to find the first number in the list (after the preamble)
 * which is not the sum of two of the 25 numbers before it.
 * What is the first number that does not have this property?
 */
// Read in puzzle input data.
const data = fs.readFileSync("./puzzle-09a-input.txt", "utf8");
const dataFilesLines = data.split(/\r?\n/);
const formattedInputData = dataFilesLines.map((input: string) =>
  parseInt(input)
);
const lookbackLength09a = 25;
const answer09a = findBadNumberInChain(formattedInputData, lookbackLength09a);
// Print 09a result.
console.log(
  `Answer for puzzle 09a`,
  answer09a,
  answer09a === 50047984 ? `(Confirmed correct answer)` : `(Incorrect answer)`
);
