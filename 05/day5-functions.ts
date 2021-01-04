import { strict as assert } from 'assert';

const maxRows = 127
const maxCols = 8

interface SeatProperties {
  row: number;
  column: number;
  id: number;
}

const bisectRange = ([lowestValue, highestValue]: [number,number], selectHalf: string): [number, number] => {
  let newLowest
  let newHighest
  if(selectHalf === 'lower'){
    newLowest = lowestValue
    newHighest = Math.floor((lowestValue + highestValue) / 2)
  } else if (selectHalf === 'upper') {
    newLowest = Math.ceil((lowestValue + highestValue) / 2)
    newHighest = highestValue
  } else {
    throw new Error('Unrecognised selectHalf argument value')
  }
  return [newLowest, newHighest]
}

interface GeneralConvertCodeOptions {
  lowerHalfChar: string;
  upperHalfChar: string;
  maxValue: number;
}

const generalConvertCode = (input: string, options: GeneralConvertCodeOptions): number => {
  const {lowerHalfChar, upperHalfChar, maxValue} = options
  const chars: string[] = [...input]
  let newRange: [number, number] = [0, maxValue]
  while (chars[0]) {
    const thisChar = chars.shift();
    switch (thisChar) {
      case lowerHalfChar:{
        newRange = bisectRange(newRange, 'lower')
        break;
      }
      case upperHalfChar:{
        newRange = bisectRange(newRange, 'upper')
        break;
      }
      default:
        throw new Error('Bad Row char in switch')
        break;
    }
  }
  const finalNumber = Math.floor((newRange[0] + newRange[1]) / 2)
  return finalNumber
}

const convertRowCode = (input: string): number => {
  return generalConvertCode(input, {lowerHalfChar: 'F', upperHalfChar: 'B', maxValue: maxRows})
}

const convertColumnCode = (input: string): number => {
  return generalConvertCode(input, {lowerHalfChar: 'L', upperHalfChar: 'R', maxValue: maxCols})
}

/**
 * Every seat also has a unique seat ID: multiply
 * the row by 8, then add the column. In this
 * example, the seat has ID 44 * 8 + 5 = 357.
*/
const computeSeatID = ({row, column}): number => {
  return row * maxCols + column
}

const seatCodeToProperties = (input: string): SeatProperties => {
  // Check input length.
  if(input.length !== 10) {
    throw new Error(`Input incorrect length.`)
  }
  // Split input chars for row and column
  const rowChars = input.substring(0,7)
  const colChars = input.substring(7)
  const row = convertRowCode(rowChars)
  const column = convertColumnCode(colChars)
  const id = computeSeatID({row, column})
  // Return answer
  return {row, column, id}
}

export {seatCodeToProperties}

/**
 * Tests
 */
/**
 * Here are some other boarding passes:
 * BFFFBBFRRR: row 70, column 7, seat ID 567.
 * FFFBBBFRRR: row 14, column 7, seat ID 119.
 * BBFFBBFRLL: row 102, column 4, seat ID 820.
 */
[
  {
    input: "BFFFBBFRRR",
    expected: {
      row: 70,
      column: 7,
      id: 567,
    },
  },
  {
    input: "FFFBBBFRRR",
    expected: {
      row: 14,
      column: 7,
      id: 119,
    },
  },
  {
    input: "BBFFBBFRLL",
    expected: {
      row: 102,
      column: 4,
      id: 820,
    },
  },
].forEach(({ input, expected }, index) => {
  try {
    assert.deepEqual(seatCodeToProperties(input), expected, `Test seatCodeToProperties() #${index}`)
  } catch (error) {
    console.error(error)
  }
})
