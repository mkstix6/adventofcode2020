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

const formattedInputData: number[] = formatInputData(dataFilesLines);

const howManyOneSteps = (input: number[]): number => {
  let count = 0;
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] + 1 === input[i + 1]) count++;
  }
  return count;
};

const howManyThreeSteps = (input: number[]): number => {
  let count = 0;
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] + 3 === input[i + 1]) count++;
  }
  return count;
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
});

/**
 * Problem 10a
 * What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?
 */
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
