// Read in puzzle input data.
import * as fs from "file-system";

type InstructionType = [
  string, string, number, boolean
]

const formatInstruction = (instruction: string): InstructionType => {
  const instructionCode = instruction.substring(0,3)
  const instructionSign = instruction.substring(4,5)
  const instructionValue = parseInt(instruction.substring(5))
  return [instructionCode, instructionSign, instructionValue, false]
}

const runProgramUntilRepeatInstruction = (instructions: InstructionType[]): number => {
  let accumulator = 0
  let instructionIndex = 0
  let terminateFlag = false 
  while(!terminateFlag) {
    const currentInstruction = instructions[instructionIndex]
    const [instructionCode, instructionSign, instructionValue, hasBeenCalled] = currentInstruction
    if(hasBeenCalled) {
      break;
    }
    // Process the instruction.
    switch (instructionCode) {
      case 'nop':{
        instructionIndex++
        break;
      }
      case 'acc':{
        instructionIndex++
        if(instructionSign === '+'){
          accumulator += instructionValue
        } else if (instructionSign === '-') {
          accumulator -= instructionValue
        } else {
          throw new Error(`Bad instructionSign value`)
        }
        break;
      }
      case 'jmp':{
        if(instructionSign === '+'){
          instructionIndex += instructionValue
        } else if (instructionSign === '-') {
          instructionIndex -= instructionValue
        } else {
          throw new Error(`Bad instructionSign value`)
        }
        break;
      }
      default:
        throw new Error(`Bad instructionCode value`)
    }
    // Mark instruction as processed.
    currentInstruction[3] = true
  }
  return accumulator
}

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
  accumulatorStop: 5
}
console.assert(runProgramUntilRepeatInstruction(example.input.split(/\r?\n/).map(formatInstruction)) === example.accumulatorStop)

/**
 * Run problem 08a
 */
const data = fs.readFileSync("./puzzle-08a-input-data.txt", "utf8");
const dataFilesLines = data.split(/\r?\n/);
const instructions = dataFilesLines.map(formatInstruction)
const answer08a = runProgramUntilRepeatInstruction(instructions)
console.log(`Answer for puzzle 08a`, answer08a)
// Correct answer for 08a was 1749.
