// Read in puzzle input data.
import * as fs from "file-system";

type FormattedInstructionType = {
  instructionCode: string;
  instructionSign: string;
  instructionValue: number;
  instructionHasBeenCalled: boolean;
};

const formatInstruction = (instruction: string): FormattedInstructionType => {
  const instructionCode = instruction.substring(0, 3);
  const instructionSign = instruction.substring(4, 5);
  const instructionValue = parseInt(instruction.substring(5));
  return {
    instructionCode,
    instructionSign,
    instructionValue,
    instructionHasBeenCalled: false,
  };
};

const runProgramUntilRepeatInstruction = (
  originalInstructions: FormattedInstructionType[]
): [number, boolean] => {
  let accumulator = 0;
  let instructionIndex = 0;
  let terminateFlag = false;
  let endOfFileReached = false;
  // Make a copy of the instructions because they will mutate.
  const instructions: FormattedInstructionType[] = originalInstructions.map(
    (instruction) => ({ ...instruction })
  );
  // Check if we triggered a termination condition.
  while (!terminateFlag) {
    const currentInstruction = instructions[instructionIndex];
    // Check if we reached the end of the instruction file.
    if (!currentInstruction) {
      endOfFileReached = true;
      terminateFlag = true;
      break;
    }
    // Check if current instruction has already been used.
    if (currentInstruction.instructionHasBeenCalled) {
      terminateFlag = true;
      break;
    }
    const {
      instructionCode,
      instructionSign,
      instructionValue,
      instructionHasBeenCalled,
    }: FormattedInstructionType = currentInstruction;
    if (instructionHasBeenCalled) {
      break;
    }
    // Process the instruction.
    switch (instructionCode) {
      case "nop": {
        instructionIndex++;
        break;
      }
      case "acc": {
        instructionIndex++;
        if (instructionSign === "+") {
          accumulator += instructionValue;
        } else if (instructionSign === "-") {
          accumulator -= instructionValue;
        } else {
          throw new Error(`Bad instructionSign value`);
        }
        break;
      }
      case "jmp": {
        if (instructionSign === "+") {
          instructionIndex += instructionValue;
        } else if (instructionSign === "-") {
          instructionIndex -= instructionValue;
        } else {
          throw new Error(`Bad instructionSign value`);
        }
        break;
      }
      default:
        throw new Error(`Bad instructionCode value`);
    }
    // Mark instruction as processed.
    currentInstruction.instructionHasBeenCalled = true;
  }
  return [accumulator, endOfFileReached];
};

/**
 * Test for the function runProgramUntilRepeatInstruction
 */
const example = {
  input: `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`,
  accumulatorStop: 5,
};
console.assert(
  runProgramUntilRepeatInstruction(
    example.input.split(/\r?\n/).map(formatInstruction)
  )[0] === example.accumulatorStop
);

/**
 * Run problem 08a
 */
const data = fs.readFileSync("./puzzle-08a-input-data.txt", "utf8");
const dataFilesLines = data.split(/\r?\n/);
const [resultAccumulator] = runProgramUntilRepeatInstruction(
  dataFilesLines.map(formatInstruction)
);
const answer08a: number = resultAccumulator;
console.log(
  `Answer for puzzle 08a`,
  answer08a,
  answer08a === 1749 ? `(Confirmed correct answer)` : `(Incorrect answer)`
);
// Correct answer for 08a was 1749.

/**
 * Run problem 08b
 */
// Brute force try changing all instructions one by one.
let answer08b: number;
let answersCount = 0;
for (let $i = dataFilesLines.length - 1; $i >= 0; $i--) {
  const copyOfInstructions: FormattedInstructionType[] = dataFilesLines.map(
    formatInstruction
  );
  const thisLoopInstructionCode: string =
    copyOfInstructions[$i].instructionCode;
  switch (thisLoopInstructionCode) {
    case "nop":
      copyOfInstructions[$i].instructionCode = "jmp";
      break;

    case "jmp":
      copyOfInstructions[$i].instructionCode = "nop";
      break;

    default:
      // Skip proccessing this version of instructions; no change to instructions.
      continue;
  }
  // Process the modified instructions.
  const [resultValue, didReachEndOfFile]: [
    number,
    boolean
  ] = runProgramUntilRepeatInstruction(copyOfInstructions);
  // Check if this version reached end of file and save result value.
  if (didReachEndOfFile) {
    answer08b = resultValue;
    answersCount++;
    break;
  }
}
// Basic log check.
console.assert(
  answersCount === 1,
  `Only one answer allowed, ${answersCount} detected`
);
// Print 08b result.
console.log(
  `Answer for puzzle 08b`,
  answer08b,
  answer08b === 515 ? `(Confirmed correct answer)` : `(Incorrect answer)`
);
// Correct answer for 08b was 515.
