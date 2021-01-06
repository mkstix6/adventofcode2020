import * as fs from "file-system";
// Read in puzzle input data.
const sortIntsAsc = (a: number, b: number) => a - b;
const stringToInt = (input: string) => parseInt(input);
const data = fs.readFileSync("./puzzle-10a-input.txt", "utf8");
const dataFilesLines = data.split(/\r?\n/).map(stringToInt);

// Any given adapter can take an input 1, 2, or 3 jolts lower than its rating and still produce its rated output joltage.
// In addition, your device has a built-in joltage adapter rated for 3 jolts higher than the highest-rated adapter in your bag. (If your adapter list were 3, 9, and 6, your device's built-in adapter would be rated for 12 jolts.)
const getDeviceJoltage = (input: number[]): number => 3 + Math.max(...input);

const formatInputData = (input: number[]): number[] => [
  0,
  ...input.sort(sortIntsAsc),
  getDeviceJoltage(input),
];

const getGapCounter = (gapSize: number) => (input: number[]): number => {
  let count = 0;
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] + gapSize === input[i + 1]) count++;
  }
  return count;
};

const howManyOneSteps: (numbers: number[]) => number = getGapCounter(1);
const howManyThreeSteps: (numbers: number[]) => number = getGapCounter(3);

const howManyCombinations = (input: number[]): number => {
  // Assess consecutive-number-sausages along number chain.
  const sausages = [[0]];
  let sausageIndex = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i - 1] !== input[i] - 1) {
      // Create new sausage.
      sausageIndex++;
      sausages[sausageIndex] = [];
    }
    sausages[sausageIndex].push(input[i]);
  }
  // Count lengths of sausages.
  const chainLengthsCounts = [];
  sausages.forEach((sausage: number[]) => {
    if (!chainLengthsCounts[sausage.length]) {
      chainLengthsCounts[sausage.length] = 0;
    }
    chainLengthsCounts[sausage.length]++;
  });
  // Compute number of solutions from sausage lengths.
  // chain of 1 = 1 permutations
  // chain of 2 = 1 permutations
  // chain of 3 = 2 permutations
  // chain of 4 = 4 permutations
  // chain of 5 = 7 permutations
  // chain of 6 = 12 permutations
  // chain of 7 = 24 permutations
  let solutionsForChainLength: number[] = [0, 1, 1, 2, 4, 7, 12, 24];
  const numberOfSolutions: number = sausages
    .map((sausage) => sausage.length)
    .reduce((accumulator, sausageLength) => {
      const newAmount = solutionsForChainLength[sausageLength];
      return accumulator * newAmount;
    }, 1);
  // Return answer.
  return numberOfSolutions;
};

/**
 * Run provided examples through funciton tests/assertions.
 */
[
  {
    input: [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4],
    expectedDeviceJoltage: 22,
    expectedOneSteps: 7,
    expectedTwoSteps: 0,
    expectedThreeSteps: 5,
    expectedArrangementPossibilities: 8,
  },
  {
    input: [
      28,
      33,
      18,
      42,
      31,
      14,
      46,
      20,
      48,
      47,
      24,
      23,
      49,
      45,
      19,
      38,
      39,
      11,
      1,
      32,
      25,
      35,
      8,
      17,
      7,
      9,
      4,
      2,
      34,
      10,
      3,
    ],
    expectedDeviceJoltage: 52,
    expectedOneSteps: 22,
    expectedTwoSteps: 0,
    expectedThreeSteps: 10,
    expectedArrangementPossibilities: 19208,
  },
].forEach((example, exampleIndex) => {
  const sortedExampleInput = formatInputData(example.input);
  // Test getDeviceJoltage()
  console.assert(
    getDeviceJoltage(example.input) === example.expectedDeviceJoltage,
    `#${exampleIndex} Unexpected getDeviceJoltage() result ${getDeviceJoltage(
      example.input
    )}; expected ${example.expectedDeviceJoltage}.`
  );
  // Test howManyOneSteps()
  console.assert(
    howManyOneSteps(sortedExampleInput) === example.expectedOneSteps,
    `#${exampleIndex} Unexpected howManyOneSteps() result ${howManyOneSteps(
      sortedExampleInput
    )}; expected ${example.expectedOneSteps}.`
  );
  // Test howManyThreeSteps()
  console.assert(
    howManyThreeSteps(sortedExampleInput) === example.expectedThreeSteps,
    `#${exampleIndex} Unexpected howManyThreeSteps() result ${howManyThreeSteps(
      sortedExampleInput
    )}; expected ${example.expectedThreeSteps}.`
  );
  // Test howManyCombinations()
  if (example.expectedArrangementPossibilities) {
    console.assert(
      howManyCombinations(sortedExampleInput) ===
        example.expectedArrangementPossibilities,
      `#${exampleIndex} Unexpected howManyCombinations() result ${howManyCombinations(
        sortedExampleInput
      )}; expected ${example.expectedArrangementPossibilities}.`
    );
  }
});

/**
 * Problem 10a
 * What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?
 */
const formattedInputData: number[] = formatInputData(dataFilesLines);
const count1steps: number = howManyOneSteps(formattedInputData);
const count3steps: number = howManyThreeSteps(formattedInputData);
// What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?
const answer10a: number = count1steps * count3steps;
// Print 10a result.
console.log(
  `Answer for puzzle 10a`,
  answer10a,
  answer10a === 2775 ? `(Confirmed correct answer)` : `(Incorrect answer)`
);
// Correct answer for 10a was 2775.

/**
 * Problem 10b
 * What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?
 */
const answer10b: number = howManyCombinations(formattedInputData);
// Print 10b result.
console.log(
  `Answer for puzzle 10b`,
  answer10b,
  answer10b === 518344341716992
    ? `(Confirmed correct answer)`
    : `(Incorrect answer)`
);
// Correct answer for 10b was 518344341716992.
